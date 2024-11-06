const IdCheck = async (req, res, next) => {
  try {
    const id = req.body.id || req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({ message: "User Id Required" });
    }
    req.id = id;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = IdCheck;
