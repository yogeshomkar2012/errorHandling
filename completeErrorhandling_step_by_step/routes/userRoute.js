const express = require("express");
const userController = require("../controllers/userControllers");
const IdCheck = require("../middlewares/idCheck");
const userRoute = express();
userRoute.get("/users/get-by-id", IdCheck, userController.getUserById);
userRoute.get("/users", userController.getAllUser);
userRoute.post("/users", userController.createUser);

module.exports = userRoute;
