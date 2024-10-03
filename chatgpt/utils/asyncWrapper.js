const asyncWrapper = (fn) => {
  // return (req, res, next) => {
  //   fn(req, res, next).catch(next);
  // };
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = asyncWrapper;
