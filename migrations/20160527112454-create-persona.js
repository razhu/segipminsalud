'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('personas', {
            id_persona: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            documento_identidad: {
                type: Sequelize.STRING
            },
            complemento_documento: {
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
            casada_apellido: {
                type: Sequelize.STRING
            },
            fecha_nacimiento: {
                type: Sequelize.STRING
            },
            fecha_creacion: {
                allowNull: false,
                type: Sequelize.DATE
            },
            fecha_modificacion: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('personas');
    }
};