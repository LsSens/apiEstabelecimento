"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // Relacionamento com Users
      Company.hasMany(models.User, {
        foreignKey: "company_id",
        as: "users",
      });

      // Relacionamento com Menu
      Company.hasMany(models.Menu, {
        foreignKey: "company_id",
        as: "menus",
      });

      // Relacionamento com Orders
      Company.hasMany(models.Order, {
        foreignKey: "company_id",
        as: "orders",
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
      modelName: "company",
    }
  );
  return Company;
};
