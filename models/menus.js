"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      Menu.hasMany(models.Item, {
        foreignKey: "menu_id",
        as: "items",
      });
    }
  }

  Menu.init(
    {
      menu_name: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Menu",
      tableName: "menus",
    }
  );

  return Menu;
};
