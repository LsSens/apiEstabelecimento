"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // Relacionamento com Menu
      Item.belongsTo(models.Menu, {
        foreignKey: "menu_id",
        as: "menu",
      });

      // Relacionamento com Orders (via tabela intermediária)
      Item.belongsToMany(models.Order, {
        through: models.OrderItem, // Especificar a tabela intermediária
        foreignKey: "item_id",
        as: "orders",
      });
    }
  }

  Item.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      available: DataTypes.BOOLEAN,
      menu_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "items",
    }
  );

  return Item;
};
