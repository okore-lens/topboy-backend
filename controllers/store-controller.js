const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Merch = require('../models/merch');

exports.getMerchs = async (req, res, next) => {
    let merchs;
    const foundMerchs = [];
    try {
        merchs = await Merch.find();
        if (!merchs){
            return next(new HttpError('Unable to get merchs'));
        }
        for(const a of merchs){
            foundMerchs.push({ id: a._id, name: a.name, creator: a.creator, price: a.price, isDiscount: a.isDiscount, newPrice: a.newPrice, image: a.image, createdAt: a.createdAt })
        }
    } catch (err) {
        return next(new HttpError('Unable to get merchs'));
    };
    res.status(200).json({ message: 'Merchs found successfully', merchs: foundMerchs });
}

exports.createMerch = async (req, res, next) => {
    const { name, price, creator } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const errorArray = errors.array();
        return next(new HttpError('Unable to process', errorArray[0].msg, 422));
    }
    let newMerch;
    try {
        newMerch = new Merch({ name, price, creator, image: 'Not yet uploaded', isDiscount: false, newPrice: 0 });
        await newMerch.save();
    } catch (err) {
        return next(new HttpError('Unable to create and save merch'));
    }
    res.status(201).json({ message: 'Merch created successfully', id: newMerch._id, name: newMerch.name, price: newMerch.price, creator: newMerch.creator, image: newMerch.image, isDiscount: newMerch.isDiscount, newPrice: newMerch.newPrice, createdAt: newMerch.createdAt })
}