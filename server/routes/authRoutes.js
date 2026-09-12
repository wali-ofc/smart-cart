const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { registerLimiter, loginLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

// POST /api/auth/register — public
router.post(
  '/register',
  registerLimiter,
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
  loginLimiter,
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

// PUT /api/auth/me — protected; update profile info
router.put(
  '/me',
  [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').optional().trim().isEmail().withMessage('Please provide a valid email')
  ],
  protect,
  updateProfile
);

// PUT /api/auth/password — protected; change password
router.put(
  '/password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  protect,
  changePassword
);

module.exports = router;