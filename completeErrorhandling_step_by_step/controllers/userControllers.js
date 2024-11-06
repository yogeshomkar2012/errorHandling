const User = require("../models/userModel");

const getAllUser = async (req, res, next) => {
  try {
    const userList = await User.find();
    res.status(200).json({ data: userList });
  } catch (error) {
    next(error);
  }
};
const createUser = async (req, res, next) => {
  try {
    const useData = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await useData.save();
    res.status(201).json({ data: user, message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User Not Foud" });
    }
    res.status(200).json({ data: user, message: "Data fetch successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = { createUser, getAllUser, getUserById };
