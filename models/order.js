"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Relacionamento com Items (via tabela intermediária)
      Order.belongsToMany(models.Item, {
        through: models.OrderItem,
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
    }
  }

  Order.init(
    {
      customer_id: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );

  return Order;
};
