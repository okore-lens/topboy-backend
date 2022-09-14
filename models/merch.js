const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchSchema = new Schema({ 
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    isDiscount: { type: Boolean, required: true },
    newPrice: { type: Number, required: true },
    creator: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Merch', merchSchema)