const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "Duplicate key Error";
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export default ErrorMiddleware;
