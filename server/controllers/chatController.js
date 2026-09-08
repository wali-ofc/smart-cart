const chatService = require('../services/chatService');
const ApiError = require('../utils/ApiError');

/** POST /api/chat — protected + rate-limited (50/day, per user) */
exports.sendMessage = async (req, res) => {
  const { message } = req.body || {};
  if (!message || !String(message).trim()) {
    throw new ApiError(400, 'Message is required');
  }
  if (String(message).trim().length > 2000) {
    throw new ApiError(400, 'Message too long (max 2000 characters)');
  }

  const userId = req.user.id;
  const msg = String(message).trim();

  // Hybrid: deterministic intent handler OR Ollama fallback — both yield { reply, actions }.
  const { reply, actions } = await chatService.getAIResponse(msg, userId);

  // Persist conversation (fire-and-forget; user message is saved even if Ollama failed).
  chatService.saveMessage(userId, msg, reply, actions).catch(console.error);

  res.status(200).json({
    success: true,
    reply,
    actions,
    timestamp: new Date().toISOString()
  });
};

/** GET /api/chat/history — protected; returns this user's conversation. */
exports.getChatHistory = async (req, res) => {
  const messages = await chatService.getChatHistory(req.user.id);
  res.status(200).json({ success: true, messages });
};

/** DELETE /api/chat/history — protected; clears this user's conversation. */
exports.clearChatHistory = async (req, res) => {
  const ChatSession = require('../models/ChatSession');
  await ChatSession.deleteMany({ user: req.user.id });
  res.status(200).json({ success: true, message: 'Chat history cleared' });
};
