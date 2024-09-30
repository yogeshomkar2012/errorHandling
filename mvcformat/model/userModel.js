import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    require: [true, "Please Enter Email"],
    unique: true,
  },
});
export const User = mongoose.model("User", userSchema);
