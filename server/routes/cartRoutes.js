const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All cart routes are protected (cart lives on the User document)
router.use(protect);

// GET /api/cart
router.get('/', getCart);

// POST /api/cart — { product, quantity }
router.post('/', addToCart);

// DELETE /api/cart/:productId — remove one line
router.delete('/:productId', removeFromCart);

// DELETE /api/cart — clear all
router.delete('/', clearCart);

module.exports = router;