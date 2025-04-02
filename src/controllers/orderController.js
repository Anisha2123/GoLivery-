

const Order = require('../models/Order'); // Ensure this model exists

const placeOrder = async (req, res) => {
    try {
        const { cabId, pickupLocation, dropoffLocation } = req.body;

        if (!cabId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const order = new Order({
            user: req.user._id,
            cabId,
            pickupLocation,
            dropoffLocation,
            status: 'pending',
        });

        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const trackOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { placeOrder, trackOrder };
