"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CustomerCompany extends Model {
    static associate(models) {
      // Relacionamento com Customer
      CustomerCompany.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });

      // Relacionamento com Company
      CustomerCompany.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
    }
  }

  CustomerCompany.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "CustomerCompany",
      tableName: "customer_company",
    }
  );

  return CustomerCompany;
};
