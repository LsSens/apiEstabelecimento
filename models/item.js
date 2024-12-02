"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // Relacionamento com Menu
      Item.belongsTo(models.Menu, {
        foreignKey: "category_id",
        as: "category",
      });

      // Relacionamento com Orders (via tabela intermediária)
      Item.belongsToMany(models.Order, {
        through: models.OrderItem,
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
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return Item;
};
