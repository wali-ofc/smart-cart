const rateLimit = require('express-rate-limit');

/**
 * Per-user chat rate limit (spec §3.3.1 / §6.2): 50 requests/user/day.
 * Runs AFTER `protect` so req.user.id is available; falls back to IP.
 * Window/limit configurable via env (defaults: 86400000 ms, 50 req).
 */
const chatLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 24 * 60 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 50,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => (req.user ? `user:${req.user.id}` : `ip:${req.ip}`),
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Daily message limit reached (50 messages/day). Please try again tomorrow.'
    });
  }
});

module.exports = { chatLimiter };