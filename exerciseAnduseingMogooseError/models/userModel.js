const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Name"],
    lowercase: true,
    minlength: [3, "invalid user name"],
  },
  email: {
    type: String,
    unique: true,
    validate: [isEmail, "Please Enter valid Email"],
    required: [true, "please Enter Email"],
    lowercase: true,
  },
});
module.exports = mongoose.model("User", userSchema);
