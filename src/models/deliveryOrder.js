"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DeliveryOrder extends Model {
    static associate(models) {
      // Relacionamento com Delivery
      DeliveryOrder.belongsTo(models.Delivery, {
        foreignKey: "delivery_id",
        as: "delivery",
      });

      // Relacionamento com Order
      DeliveryOrder.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }

  DeliveryOrder.init(
    {
      delivery_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DeliveryOrder",
      tableName: "delivery_orders",
    }
  );

  return DeliveryOrder;
};
