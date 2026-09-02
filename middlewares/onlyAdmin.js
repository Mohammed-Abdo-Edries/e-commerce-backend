const User = require("../models/userModel");

const onlyAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        message: "You are not an admin",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = onlyAdmin;