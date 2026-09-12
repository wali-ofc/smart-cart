const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const ApiError = require('../utils/ApiError');

/** httpOnly token cookie — config matches production/development splits. */
const cookieOptions = () => ({
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
});

const failed = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }
};

/** POST /api/auth/register — { name, email, password, role? } */
exports.register = async (req, res) => {
  failed(req);
  const { name, email, password, role = 'customer' } = req.body;
  const { user, token } = await authService.register({ name, email, password, role });

  res.status(201).cookie('token', token, cookieOptions()).json({
    success: true,
    token,
    user: user.toSafeJSON()
  });
};

/** POST /api/auth/login — { email, password } */
exports.login = async (req, res) => {
  failed(req);
  const { email, password } = req.body;
  const { user, token } = await authService.login({ email, password });

  res.status(200).cookie('token', token, cookieOptions()).json({
    success: true,
    token,
    user: user.toSafeJSON()
  });
};

/** POST /api/auth/logout — protected; clears the token cookie */
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'lax'
  });
  res.status(200).json({ success: true, data: {} });
};

/** GET /api/auth/me — protected; current user */
exports.getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  res.status(200).json({ success: true, user: user.toSafeJSON() });
};

/** PUT /api/auth/me — protected; update profile info */
exports.updateProfile = async (req, res) => {
  failed(req);
  const { name, email } = req.body;
  const user = await authService.updateProfile(req.user.id, { name, email });
  res.status(200).json({ success: true, user: user.toSafeJSON() });
};

/** PUT /api/auth/password — protected; change password */
exports.changePassword = async (req, res) => {
  failed(req);
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.id, { currentPassword, newPassword });
  res.status(200).json({ success: true, data: {}, message: 'Password updated successfully' });
};