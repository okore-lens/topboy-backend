const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: { type: String, required: true },
    venue: { type: String, required: true },
    poster: { type: String, required: true },
    dayMonth: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);