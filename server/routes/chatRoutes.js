const express = require('express');
const { sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { chatLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

// POST /api/chat — protected + per-user rate limit (50/day, spec §3.3.1)
router.post('/', protect, chatLimiter, sendMessage);

module.exports = router;