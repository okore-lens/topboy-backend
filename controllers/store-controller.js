const { validationResult } = require('express-validator');
const path = require('path');

const HttpError = require('../models/http-error');
const Merch = require('../models/merch');
const Event = require('../models/event');

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

exports.getEvents = async (req, res, next) => {
    let events;
    const foundEvents = [];
    try {
        events = await Event.find();
        if(!events) {
            return next(new HttpError('Unable to get events'));  
        }
        for(const a of events) {
            foundEvents.push({ id: a._id, name: a.name, venue: a.venue, dayMonth: a.dayMonth, poster: a.poster });
        }
    } catch (err) {
        return next(new HttpError('Unable to get events'));
    }
    res.status(200).json({ message: "Events found successfully", events: foundEvents });
}

exports.addEvent = async (req, res, next) => {
    const { name, venue, dayMonth } = req.body;
    const image = req.file;
    if (!image){
        return next(new HttpError('Unable to procees image upload', [{ message: 'Please upload an image', type: 'image' }], 422));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const errorArray = errors.array();
        return next(new HttpError('Unable to process', errorArray[0].msg, 422));
    };
    const imageUrl = image.path.split('images')[1].substring(2, image.path.split('images')[1].length);
    const newEvent = new Event({ name, venue, dayMonth, poster: imageUrl });
    try {
        await newEvent.save();
    } catch (err) {
        return next(new HttpError('Unable to save the event'));
    }
    res.status(201).json({ message: 'Event added successfully', name: newEvent.name, id: newEvent._id, venue: newEvent.venue, poster: newEvent.poster, dayMonth: newEvent.dayMonth });
}