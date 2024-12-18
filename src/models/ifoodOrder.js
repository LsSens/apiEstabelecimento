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
      ifood_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ifood_order_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "IfoodOrder",
      tableName: "ifood_orders",
      timestamps: true,
    }
  );
  return IfoodOrder;
};
