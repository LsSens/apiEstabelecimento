"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class IfoodOrder extends Model {
    static associate(models) {

      // Relacionamento com Order
      IfoodOrder.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }

  IfoodOrder.init(
    {
      ifood_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "IfoodOrder",
      tableName: "ifood_orders",
    }
  );

  return IfoodOrder;
};
