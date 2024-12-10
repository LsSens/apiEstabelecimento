"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {

      Item.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      // Relacionamento com Menu
      Item.belongsToMany(models.Menus, {
        through: models.MenuItems,
        foreignKey: "item_id",
        as: "menus",
      });

      // Relacionamento com Orders (via tabela intermediária)
      Item.belongsToMany(models.Order, {
        through: models.OrderItems,
        foreignKey: "item_id",
        as: "orders",
      });
    }
  }

  Item.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "items",
    }
  );

  return Item;
};
