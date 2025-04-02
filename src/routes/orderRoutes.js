

const express = require('express');
const { placeOrder, trackOrder } = require('../controllers/orderController'); // Ensure these are valid
const { protect } = require('../middleware/authMiddleware'); // Ensure this file exists

const router = express.Router();

router.post('/place', protect, placeOrder); // Ensure `placeOrder` is correctly defined
router.get('/track/:orderId', protect, trackOrder); // Ensure `trackOrder` is correctly defined

module.exports = router;

