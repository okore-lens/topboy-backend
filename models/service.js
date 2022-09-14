const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const serviceSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);