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

  if (user.disabled) {
    throw new ApiError(403, 'This account has been disabled');
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

/** Update profile info — PUT /api/auth/me. */
exports.updateProfile = async (userId, { name, email }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (email && email.toLowerCase() !== user.email.toLowerCase()) {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing && existing._id.toString() !== userId) {
      throw new ApiError(400, 'An account with this email already exists');
    }
    user.email = email.toLowerCase();
  }

  if (name) {
    user.name = name;
  }

  await user.save();
  return user;
};

/** Change password — PUT /api/auth/password. */
exports.changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();
};