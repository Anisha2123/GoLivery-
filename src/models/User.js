

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false } // ✅ Ensure this field exists
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

