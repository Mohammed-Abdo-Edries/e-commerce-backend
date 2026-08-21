const User = require("../models/userModel");

const onlyAdmin = async (req, res, next) => {
  try {
    const email = req.headers.email;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not an admin",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = onlyAdmin;