require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;
const {
  pageNotFound,
  globleError,
} = require("./middlewares/errorMiddlewares.js");
const dbConnection = require("./config/db");
//
const userRoute = require("./routes/userRoute.js");
//
// set view Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// set view Engine
//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//middlewares

// dbconnection
dbConnection(PORT);
// dbconnection
// routes
app.use("/user", userRoute);
// app.use(pageNotFound);
app.use(globleError);
// routes
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
