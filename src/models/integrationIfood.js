'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class IntegrationIfood extends Model {
        static associate(models) {
            IntegrationIfood.belongsTo(models.Company, {
                foreignKey: 'company_id',
                as: 'company',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            });
        }
    }

    IntegrationIfood.init(
        {
            company_id: {
                type: DataTypes.TEXT,
                allowNull: false,
                references: {
                    model: 'companies',
                    key: 'id',
                },
            },
            access_token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            refresh_token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            token_expires_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'IntegrationIfood',
            tableName: 'integration_ifood',
            timestamps: true,
        }
    );

    return IntegrationIfood;
};
