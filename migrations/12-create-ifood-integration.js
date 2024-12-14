'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('integration_ifood', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'companies',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
                validate: {
                    isDate: true,
                }
            },
            merchant_id: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            corporateName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('integration_ifood');
    },
};
