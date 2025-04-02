


const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cab: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab' },
    status: { type: String, enum: ['pending', 'accepted', 'on-the-way', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
