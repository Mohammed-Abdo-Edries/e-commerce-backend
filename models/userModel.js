const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      },
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Signup
User.signup = async function (firstname, lastname, email, password) {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })
  ) {
    throw new Error("Password not strong enough");
  }

  const exists = await User.findOne({
    where: { email },
  });

  if (exists) {
    throw new Error("Email already in use");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hash,
  });

  return user;
};

// Login
User.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = User;