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

      // Relacionamento com Company
      Customer.belongsToMany(models.Company, {
        through: "customer_company",
        foreignKey: "customer_id",
        as: "company",
      });
    }
  }

  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: DataTypes.JSON,
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
    }
  );

  return Customer;
};
