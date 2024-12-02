"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Relacionamento com Customers
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });

      // Relacionamento com Companies
      Order.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      // Relacionamento com Items (via tabela intermediária)
      Order.belongsToMany(models.Item, {
        through: models.OrderItem,
        foreignKey: "order_id",
        as: "items",
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
      modelName: "order",
    }
  );
  return Order;
};
