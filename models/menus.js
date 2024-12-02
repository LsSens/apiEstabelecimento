"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    static associate(models) {
      // Relacionamento com Company
      s.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      // Relacionamento com Items
      Menus.hasMany(models.Item, {
        foreignKey: "category_id",
        as: "items",
      });
    }
  }
  Menus.init(
    {
      category_name: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "menus",
    }
  );
  return Menus;
};
