const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const onlyAdmin = require("../middlewares/onlyAdmin");
const validate = require("../middlewares/validate");

const {
  signup,
  login,
  getAllUsers,
  deleteAllUsers,
} = require("../controllers/userController");

const {
  signupSchema,
  loginSchema,
} = require("../validators/authValidator");


// AUTH
router.post(
  "/signup",
  validate(signupSchema),
  signup
);

router.post(
  "/login",
  validate(loginSchema),
  login
);


// ADMIN
router.get(
  "/getAllUsers",
  auth,
  onlyAdmin,
  getAllUsers
);

router.delete(
  "/deleteAllUsers",
  auth,
  onlyAdmin,
  deleteAllUsers
);


module.exports = router;