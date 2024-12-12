"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    static associate(models) {
      // Relacionamento com DeliveryOrder
      Delivery.hasMany(models.DeliveryOrder, {
        foreignKey: "delivery_id",
        as: "delivery_orders",
      });

      // Relacionamento indireto com Order através de DeliveryOrder
      Delivery.belongsToMany(models.Order, {
        through: models.DeliveryOrder,
        foreignKey: "delivery_id",
        otherKey: "order_id",
        as: "orders",
      });
    }
  }

  Delivery.init(
    {
      company_id: DataTypes.INTEGER,
      delivery_status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
      },
      total_cost: DataTypes.DECIMAL(10, 2),
      total_fee: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Delivery",
      tableName: "deliveries",
      paranoid: true,
    }
  );

  return Delivery;
};
