

const Cab = require('../models/Cab');

// ✅ Get all cabs
const getCabs = async (req, res) => {
    try {
        const cabs = await Cab.find();
        res.status(200).json(cabs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ✅ Add a new cab (admin only)
const addCab = async (req, res) => {
    try {
        const { name, type, capacity, farePerKm } = req.body;
        const newCab = new Cab({ name, type, capacity, farePerKm });
        await newCab.save();
        res.status(201).json({ message: 'Cab added successfully', cab: newCab });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

module.exports = { getCabs, addCab };

