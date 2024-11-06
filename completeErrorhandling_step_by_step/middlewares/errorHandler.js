// middlewares/errorHandler.js
const {
  ValidationError,
  CastError,
  DuplicateKeyError,
  DatabaseConntionError,
  AuthenticationError,
  AuthorizationError,
  AppError,
} = require("../utils/customErrors");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    const errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message.replace("Path ", "");
      return acc;
    }, {});
    err = new ValidationError(errors);
  }

  // Handle Mongoose Validation Error
  // Handle Mongoose Cast Error
  if (err.name === "CastError") {
    err = new CastError("Data Not Matched", 400); // Wrap Mongoose cast error in custom class
  }
  // Handle Mongoose Cast Error
  // duplicate error
  if (err.code === 11000) {
    err = new DuplicateKeyError("Data Aready Exist", 409); // Wrap Mongoose duplicate key error in custom class
  }
  // duplicate error
  // dbconnection Error
  if (err instanceof DatabaseConntionError) {
    console.warn("database Connection issue", 500);
  }
  // dbconnection Error
  if (err.isOperational) {
    const response = {
      status: "Error",
      message: err.message,
      statusCode: err.statusCode,
    };
    if (err instanceof ValidationError) {
      response.errors = err.errors;
    }
    return res.status(err.statusCode).json(response);
  }
  // Handle unexpected errors with generic response
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};

module.exports = errorHandler;
