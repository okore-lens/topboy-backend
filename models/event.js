const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: { type: String, required: true },
    location: { 
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    poster: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);