const User = require('../models/userModel');
const AppError = require('../utils/appError');
const asyncWrapper = require('../utils/asyncWrapper');

// Controller function to fetch a user by ID
exports.getUserById = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).render('userProfile', { user });
});