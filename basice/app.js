import express from "express";

const app = express();
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.use(
  "/",
  (req, res, next) => {
    console.log("A");
    return next(new ErrorHandler("page not found", 404));
    // next();
  },
  (req, res, next) => {
    console.log("b");
    return next(new ErrorHandler("unauthorised", 401));
    // next();
  },
  (req, res, next) => {
    console.log("c");

    next();
  }
);
app.use((err, req, res, next) => {
  console.log("working");
  let statusCode = err.statusCode || 500;
  let message = err.message || "internal server error";
  res.status(statusCode).json({
    message: message,
  });
});
app.listen(3000);
