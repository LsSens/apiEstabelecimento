"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    static associate(models) {
      Menus.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      Menus.belongsToMany(models.Item, {
        through: models.MenuItems,
        foreignKey: "menu_id",
        as: "items",
      });
    }
  }

  Menus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      menu_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Menus",
      tableName: "menus",
      timestamps: true,
    }
  );

  return Menus;
};
