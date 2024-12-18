"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Relacionamento com Items (via tabela intermediária)
      Order.belongsToMany(models.Item, {
        through: models.OrderItems,
        foreignKey: "order_id",
        as: "items",
      });

      // Relacionamento com Customer
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });

      // Relacionamento com Company
      Order.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      // Relacionamento com DeliveryOrder
      Order.hasOne(models.DeliveryOrder, {
        foreignKey: "order_id",
        as: "deliveryOrder",
      });

      // Relacionamento com IfoodOrder
      Order.hasOne(models.IfoodOrder, {
        foreignKey: "order_id",
        as: "ifoodOrder",
      })
    }
  }

  Order.init(
    {
      customer_id: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
      status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
      },
      company_id: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      delivery_fee: DataTypes.DECIMAL,
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Order",
      tableName: "orders",
    }
  );

  return Order;
};
