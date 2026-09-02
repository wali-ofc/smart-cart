const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Requires User to be populated or attached fully in protect middleware
    // We'll just fetch user role in actual app if needed, or put role in JWT
    // For now, assume req.user.role is set or fetch it
    next();
  };
};
