const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// CREATE TOKEN
const createToken = (id) => {
  return jwt.sign(
    { _id: id },
    process.env.SECRET,
    { expiresIn: "3d" }
  );
};


// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user.id);

    return res.status(200).json({
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};


// SIGNUP
const signup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
  } = req.body;

  try {
    const user = await User.signup(
      firstname,
      lastname,
      email,
      password
    );

    const token = createToken(user.id);

    return res.status(201).json({
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};


// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};


// DELETE ALL USERS
const deleteAllUsers = async (req, res) => {
  try {
    const deletedCount = await User.destroy({
      where: {},
    });

    return res.status(200).json({
      message: "All users deleted successfully",
      deletedCount,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};


module.exports = {
  login,
  signup,
  getAllUsers,
  deleteAllUsers,
};