import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getNewUser = catchAsyncError(async (req, res, next) => {
  const userExist = false;
  if (userExist) {
    return next(new ErrorHandler("User Already Exist", 403));
  }
  const userObj = new User({
    name: "yogesh",
    email: "yogeshomkarAgencies@gmail.com",
  });
  await userObj.save();
  res.status(201).json({
    success: true,
    message: "data inserted",
  });
});
