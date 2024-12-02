"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      // Relacionamento com Items
      Menu.hasMany(models.Item, {
        foreignKey: "category_id",
        as: "items",
      });

      // Relacionamento com Company
      Menu.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
    }
  }

  Menu.init(
    {
      category_name: DataTypes.STRING,
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
