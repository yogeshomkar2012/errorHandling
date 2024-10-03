const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

userRoute.get("/", userController.getAllusers);
userRoute.get("/adduser", userController.getAddUser);
userRoute.post("/adduser", userController.postAddUser);
userRoute.get("/edit/:id", userController.getUserEdit);
userRoute.post("/edit/:id", userController.updateUser);
userRoute.get("/delete/:id", userController.deleteUser);

module.exports = userRoute;
