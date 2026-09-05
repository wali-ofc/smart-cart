const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getCategories,
  getProduct,
  getLikes,
  getLikeStatus,
  addLike,
  removeLike,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, optionalAuth, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

const PRODUCT_CATEGORIES = [
  'Electronics & Gadgets',
  'Fashion & Apparel',
  'Beauty & Personal Care',
  'Home & Kitchen',
  'Health & Fitness'
];

// NOTE: static segments (/categories, /likes) MUST be declared before /:id

// GET /api/products — public list
router.get('/', getProducts);

// GET /api/products/categories — public
router.get('/categories', getCategories);

// GET /api/products/likes — protected (my likes)
router.get('/likes', protect, getLikes);

// GET /api/products/:id — public detail
router.get('/:id', getProduct);

// GET /api/products/:id/like — public like status (optional auth)
router.get('/:id/like', optionalAuth, getLikeStatus);

// POST /api/products — seller-only create
router.post(
  '/',
  protect,
  authorize('seller'),
  [
    body('name').trim().isLength({ min: 1, max: 200 }).withMessage('Name is required (max 200)'),
    body('description')
      .trim()
      .isLength({ min: 1, max: 2000 })
      .withMessage('Description is required (max 2000)'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').isIn(PRODUCT_CATEGORIES).withMessage('Invalid category'),
    body('image').notEmpty().withMessage('Image is required'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be 0 or more'),
    body('keywords').optional().isArray().withMessage('Keywords must be an array'),
    body('subCategory').optional().isString().withMessage('Sub-category must be a string')
  ],
  createProduct
);

// POST /api/products/:id/like — protected (toggle on)
router.post('/:id/like', protect, addLike);

// PUT /api/products/:id — seller-only update
router.put(
  '/:id',
  protect,
  authorize('seller'),
  [
    body('name').optional().trim().isLength({ min: 1, max: 200 }),
    body('description').optional().trim().isLength({ min: 1, max: 2000 }),
    body('price').optional().isFloat({ min: 0 }),
    body('category').optional().isIn(PRODUCT_CATEGORIES),
    body('image').optional().notEmpty(),
    body('stock').optional().isInt({ min: 0 }),
    body('keywords').optional().isArray(),
    body('subCategory').optional().isString()
  ],
  updateProduct
);

// DELETE /api/products/:id/like — protected (toggle off)
router.delete('/:id/like', protect, removeLike);

// DELETE /api/products/:id — seller-only delete
router.delete('/:id', protect, authorize('seller'), deleteProduct);

module.exports = router;