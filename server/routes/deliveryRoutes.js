const express = require('express');
const {
  getAssigned,
  updateStatus
} = require('../controllers/deliveryController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All delivery routes require the delivery role
router.use(protect);
router.use(authorize('delivery'));

// GET /api/delivery/assigned
router.get('/assigned', getAssigned);

// PUT /api/delivery/:orderId/status — { status: delivered | cancelled }
router.put('/:orderId/status', updateStatus);

module.exports = router;