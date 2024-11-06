const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");
app.use(express.json());
app.use("/api", userRoute);
// // Global error-handling middleware (placed last)
app.use(errorHandler);
module.exports = app;
