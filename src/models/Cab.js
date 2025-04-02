


const mongoose = require('mongoose');

const CabSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Sedan', 'SUV', 'Hatchback'], required: true },
    capacity: { type: Number, required: true },
    farePerKm: { type: Number, required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Cab', CabSchema);

