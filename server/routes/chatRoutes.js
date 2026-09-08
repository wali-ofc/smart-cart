const express = require('express');
const { sendMessage, getChatHistory, clearChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { chatLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

// All chat routes are protected.
router.use(protect);

// POST /api/chat — send a message (per-user rate limit 50/day, spec §3.3.1)
router.post('/', chatLimiter, sendMessage);

// GET /api/chat/history — fetch this user's conversation
router.get('/history', getChatHistory);

// DELETE /api/chat/history — clear this user's conversation
router.delete('/history', clearChatHistory);

module.exports = router;
