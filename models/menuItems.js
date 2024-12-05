"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MenuItems extends Model {
    static associate(models) {
      MenuItems.belongsTo(models.Menus, { foreignKey: "menu_id", as: "menu" });
      MenuItems.belongsTo(models.Item, { foreignKey: "item_id", as: "item" });
      MenuItems.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
    }
  }

  MenuItems.init(
    {
      menu_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MenuItems",
      tableName: "menu_items",
    }
  );

  return MenuItems;
};
