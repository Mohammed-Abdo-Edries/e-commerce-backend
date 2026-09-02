const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    products: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    buyer: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    adsress: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    onWay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;