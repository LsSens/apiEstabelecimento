"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.User, {
        foreignKey: "company_id",
        as: "users",
      });
      // Relacionamento com Customers
      Company.belongsToMany(models.Customer, {
        through: "customer_company",
        foreignKey: "company_id",
        as: "customers",
      });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      address: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
    }
  );
  return Company;
};
