const express = require('express');
const { body } = require('express-validator');
const {
  getProductReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/reviews/product/:productId — public
router.get('/product/:productId', getProductReviews);

// GET /api/reviews/my-reviews — protected (declared before any /:id route)
router.get('/my-reviews', protect, getMyReviews);

// POST /api/reviews/product/:productId — protected
router.post(
  '/product/:productId',
  protect,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim().isLength({ max: 1000 }).withMessage('Comment max 1000 characters')
  ],
  createReview
);

// PUT /api/reviews/:id — protected, owner only
router.put(
  '/:id',
  protect,
  [
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim().isLength({ max: 1000 }).withMessage('Comment max 1000 characters')
  ],
  updateReview
);

// DELETE /api/reviews/:id — protected, owner only
router.delete('/:id', protect, deleteReview);

module.exports = router;