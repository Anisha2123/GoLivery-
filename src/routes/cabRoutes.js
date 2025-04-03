


const express = require('express');
const { getCabs, addCab } = require('../controllers/cabController'); // Ensure functions are correctly imported
const { protect, isAdmin } = require('../middleware/authMiddleware'); // Check the file exists

const router = express.Router();

// router.get('/list', getCabs); // ✅ Public API
router.get('/list', protect,isAdmin, getCabs); // 🔒 Requires Login

router.post('/add', protect, isAdmin, addCab); // ✅ Admin Only

module.exports = router;


