"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // Relacionamento com Orders
      Customer.hasMany(models.Order, {
        foreignKey: "customer_id",
        as: "orders",
      });
    }
  }
  Customer.init(
    {
      address: DataTypes.JSON,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "customer",
    }
  );
  return Customer;
};
