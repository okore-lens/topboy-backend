const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mixSchema = new Schema({
    name: { type: String, required: true },
    file: { type: String, required: true, },
    vieo: { type: String, required: true },
    creator: { type: String, required: true },
    genre: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Mix', mixSchema);