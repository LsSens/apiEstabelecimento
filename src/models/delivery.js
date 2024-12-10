"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    static associate(models) {
      Delivery.hasMany(models.DeliveryOrder, {
        foreignKey: "delivery_id",
        as: "delivery_orders",
      });
    }
  }

  Delivery.init(
    {
      status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
      },
    },
    {
      sequelize,
      modelName: "Delivery",
      tableName: "deliveries",
    }
  );

  return Delivery;
};
