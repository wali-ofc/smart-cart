const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  logout,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/register — public
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').trim().isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
      .optional()
      .isIn(['customer', 'seller', 'delivery'])
      .withMessage('Role must be customer, seller, or delivery')
  ],
  register
);

// POST /api/auth/login — public
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

// POST /api/auth/logout — protected (spec: Auth yes)
router.post('/logout', protect, logout);

// GET /api/auth/me — protected
router.get('/me', protect, getMe);

module.exports = router;