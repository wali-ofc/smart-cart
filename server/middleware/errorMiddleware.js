const ApiError = require('../utils/ApiError');

/** 404 for unknown routes (must be mounted after all route groups). */
exports.notFound = (req, res, next) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
};

/**
 * Central error handler (spec §4.2.1 — error middleware LAST).
 * Normalizes ApiError, Mongoose errors, and duplicate-key conflicts.
 */
// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';
  let errors;

  // Express-validator failures arrive wrapped in ApiError
  if (err instanceof ApiError && err.errors) {
    errors = err.errors.map((e) => ({
      field: e.path || e.param,
      message: e.msg
    }));
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid id format: ${err.value}`;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  if (statusCode >= 500) console.error(err.stack || err);

  res.status(statusCode).json({ success: false, error: message, ...(errors ? { errors } : {}) });
};