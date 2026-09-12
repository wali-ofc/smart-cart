const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getToken = (req) => {
  if (req.cookies && req.cookies.token) return req.cookies.token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

/**
 * Require a valid JWT (cookie `token` or Authorization Bearer header).
 * Attaches the full user document to req.user. No hardcoded/synthetic admin.
 */
exports.protect = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    if (user.disabled) {
      return res.status(403).json({ success: false, error: 'This account has been disabled' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

/**
 * Optional auth — attaches req.user when a valid token is present, never rejects.
 * Used for public endpoints that personalize (e.g. like status on GET /:id/like).
 */
exports.optionalAuth = async (req, res, next) => {
  const token = getToken(req);
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = await User.findById(decoded.id);
  } catch (error) {
    // Ignore invalid tokens on optional routes
  }
  next();
};

/** Role guard — require req.user.role to be one of the allowed roles. */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};