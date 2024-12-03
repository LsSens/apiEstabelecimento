"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    static associate(models) {
      Menus.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      Menus.hasMany(models.Item, {
        foreignKey: "menu_id",
        as: "items",
      });
    }
  }

  Menus.init(
    {
      menu_name: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Menus",
      tableName: "menus",
    }
  );

  return Menus;
};
