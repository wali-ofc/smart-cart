const chatService = require('../services/chatService');
const ApiError = require('../utils/ApiError');

/** POST /api/chat — protected + rate-limited (50/day, per user) */
exports.sendMessage = async (req, res) => {
  const { message } = req.body || {};
  if (!message || !String(message).trim()) {
    throw new ApiError(400, 'Message is required');
  }

  const { reply } = await chatService.sendMessage(req.user.id, String(message).trim());
  res.status(200).json({ success: true, reply });
};