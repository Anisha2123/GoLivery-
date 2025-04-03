


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');

dotenv.config();
connectDB();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Ride-hailing API is live!" });
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cabs', require('./routes/cabRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);
};

hashPassword("admin123");


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app; // Export only the app, NOT the server