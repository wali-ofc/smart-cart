const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/** Register a new user (spec §3.3.1 POST /api/auth/register). */
exports.register = async ({ name, email, password, role = 'customer' }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(400, 'An account with this email already exists');
  }

  const user = await User.create({ name, email, password, role });
  return { user, token: user.getSignedToken() };
};

/** Login with email + password (spec §3.3.1 POST /api/auth/login). */
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return { user, token: user.getSignedToken() };
};

/** Fetch the current user document (spec GET /api/auth/me). */
exports.getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};