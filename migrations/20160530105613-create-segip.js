'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('segips', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            usuario: {
                type: Sequelize.STRING
            },
            contrasena: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            endpoint_base: {
                type: Sequelize.STRING
            },
            endpoint_tokens: {
                type: Sequelize.STRING
            },
            endpoint_personas: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('segips');
    }
};