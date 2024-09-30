export const catchAsyncError = (fn) => (req, res, next) => {
  //   try {
  //     fn(req, res, next);
  //   } catch (error) {
  //     next(error);
  //     }
  // or
  Promise.resolve(fn(req, res, next)).catch(next);
};
