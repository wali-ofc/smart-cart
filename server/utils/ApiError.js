/**
 * Operational error carrying an HTTP status code (spec §4.2 error handling).
 * Optional `errors` array holds validation details (express-validator output).
 */
class ApiError extends Error {
  constructor(statusCode, message, errors) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    if (errors) this.errors = errors;
  }
}

module.exports = ApiError;