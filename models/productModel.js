const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.ENUM("Men", "Women", "Kids"),
      allowNull: false,
    },

    subCategory: {
      type: DataTypes.ENUM(
        "Topwear",
        "Bottomwear",
        "Winterwear"
      ),
      allowNull: false,
    },

    sizes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    imageKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bestseller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;