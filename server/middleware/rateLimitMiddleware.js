const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

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
  // Per-user key when authenticated; library ipKeyGenerator handles IPv6-safe IP fallback
  keyGenerator: (req) => (req.user ? `user:${req.user.id}` : ipKeyGenerator(req)),
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Daily message limit reached (50 messages/day). Please try again tomorrow.'
    });
  }
});

/**
 * Per-IP register rate limit: 5 requests / 15 min.
 * Runs BEFORE any auth middleware so keyed by IP.
 */
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req),
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many registration attempts. Please try again later.'
    });
  }
});

/**
 * Per-IP login rate limit: 10 requests / 15 min.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req),
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many login attempts. Please try again later.'
    });
  }
});

/**
 * Per-IP review rate limit: 20 requests / 15 min.
 */
const reviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req),
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many reviews. Please try again later.'
    });
  }
});

module.exports = { chatLimiter, registerLimiter, loginLimiter, reviewLimiter };