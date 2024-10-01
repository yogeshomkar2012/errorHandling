require("dotenv").config();
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const AppError = require('./utils/appError');
const connectDb = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
connectDb(port);

const userRoutes = require('./routes/userRoutes');

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Set the view engine to EJS

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse incoming requests with JSON payloads

// Use the user routes
app.use('/users', userRoutes);
// Use the user routes
// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
// Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // Render error page with stack trace in development
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      message: err.message,
      error: err,
      statusCode: err.statusCode,
    });
  } else if (process.env.NODE_ENV === 'production') {
    // Simpler error page in production
    let message = err.isOperational ? err.message : 'Please try again later.';
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      message,
      error: {}, // Hide error details in production
      statusCode: err.statusCode,
    });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
