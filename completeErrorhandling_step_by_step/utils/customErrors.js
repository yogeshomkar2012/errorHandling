class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super("Validation failed", 400);
    this.errors = errors;
  }
}
class DuplicateKeyError extends AppError {
  constructor(text, statusCode) {
    super(text, statusCode);
  }
}
class CastError extends AppError {
  constructor(mes, statcode) {
    super(mes, statcode);
  }
}
class AuthenticationError extends AppError {
  constructor(mes, statcode) {
    super(mes, statcode);
  }
}
class AuthorizationError extends AppError {
  constructor(mes, statcode) {
    super(mes, statcode);
  }
}
class DatabaseConntionError extends AppError {
  constructor(mes, statcode) {
    super(mes, statcode);
  }
}
module.exports = {
  AppError,
  DuplicateKeyError,
  ValidationError,
  CastError,
  AuthenticationError,
  AuthorizationError,
  DatabaseConntionError,
};
