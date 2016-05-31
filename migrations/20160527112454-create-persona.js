'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('personas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            complemento_visible: {
                type: Sequelize.STRING
            },
            numero_documento: {
                type: Sequelize.STRING
            },
            complemento: {
                type: Sequelize.STRING
            },
            nombres: {
                type: Sequelize.STRING
            },
            primer_apellido: {
                type: Sequelize.STRING
            },
            segundo_apellido: {
                type: Sequelize.STRING
            },
            apellido_esposo: {
                type: Sequelize.STRING
            },
            domicilio: {
                type: Sequelize.STRING
            },
            fecha_nacimiento: {
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
        return queryInterface.dropTable('personas');
    }
};