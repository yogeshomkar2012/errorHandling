const mongoose = require("mongoose");
const pageNotFound = async (req, res, next) => {
  try {
    res.status(404).render("404", { title: 404, message: "Page Not Found" });
  } catch (error) {
    next(error);
  }
};
const globleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server Error";

  if (process.env.NODE_ENV === "development") {
    // Detailed error for development
    res.status(err.statusCode).render("error", {
      title: err.statusCode,
      message: err.message,
    });
  } else if (process.env.NODE_ENV === "production") {
    // Simpler error message for production
    let message = err.isOperational ? err.message : "Please try again later.";
    res.status(err.statusCode).render("error", {
      title: err.statusCode,
      message: message,
    });
  }
  // ValidatorError,casting and duplicate
  if (err.name === "ValidationError") {
    err.message = "Invalid data input. Please check your data and try again.";
    err.statusCode = 400;
  } else if (err.code === 11000) {
    err.message = "Duplicate field value entered. Please use another value.";
    err.statusCode = 400;
  } else if (err.name === "CastError") {
    err.message = `Invalid ${err.path}: ${err.value}.`;
    err.statusCode = 400;
  }
// ValidatorError,casting and duplicate
  res
    .status(err.statusCode)
    .render("error", { title: err.statusCode, message: err.message });
};
module.exports = {
  pageNotFound,
  globleError,
};
