const mongoose = require("mongoose");
const UserModel = require("../models/userModel.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const customErrorHandler = require("../utils/customErrorhandler.js");
const getAllusers = async (req, res, next) => {
  try {
    const userData = await UserModel.find();
    res.render("user", { users: userData });
  } catch (error) {
    next(error);
  }
};
const getAddUser = asyncWrapper(async (req, res) => {
  res.render("adduser", { errs: null });
});
const postAddUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const userDataobj = new UserModel({
      name: name,
      email: email,
    });
    await userDataobj.save();
    res.json({ success: true, message: "created successfully" });
  } catch (error) {
    const errs = {};
    if (error instanceof mongoose.Error.ValidationError) {
      const Errkeys = [];
      let errMsg = [];
      Object.keys(error.errors).forEach((key) => {
        Object.keys(error.errors[key].properties).forEach((intkey, i) => {
          if (intkey === "path") {
            Errkeys.push(error.errors[key].properties[intkey]);
          }
          if (intkey === "message") {
            errMsg.push(error.errors[key].properties[intkey]);
          }
        });
      });
      errMsg.forEach((msg, i) => {
        errs[Errkeys[i]] = errMsg[i];
      });
    }
    if (error.code === 11000) {
      errs.email = "Email is Already Exist";
    }
    res.status(400).json({ errs: errs });
  }
};
const getUserEdit = async (req, res, next) => {
  try {
    const userData = await UserModel.findById({ _id: req.params.id });
    res.render("useredit", { userData });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      },
      { new: true }
    );
    res.redirect("/user");
  } catch (error) {
    next(error);
  }
};
const deleteUser = asyncWrapper(async (req, res, next) => {
  await UserModel.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/user");
});
module.exports = {
  getAllusers,
  getAddUser,
  postAddUser,
  getUserEdit,
  updateUser,
  deleteUser,
};
