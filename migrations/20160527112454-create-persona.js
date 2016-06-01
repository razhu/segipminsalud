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
            },
            sexo: {
                allowNull: true,
                type: Sequelize.STRING
            },
            id_localidad_nacimiento: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            gestion: {
                allowNull: true,
                type: Sequelize.STRING
            },
            oficialia: {
                allowNull: true,
                type: Sequelize.STRING
            },
            partida: {
                allowNull: true,
                type: Sequelize.STRING
            },
            libro: {
                allowNull: true,
                type: Sequelize.STRING
            },
            folio: {
                allowNull: true,
                type: Sequelize.STRING
            },
            estado: {
                allowNull: true,
                type: Sequelize.STRING
            },
            usuario_creacion: {
                allowNull: true,
                type: Sequelize.DATE
            },
            usuario_modificacion: {
                allowNull: true,
                type: Sequelize.DATE
            },
            par_tipo_documento_identidad: {
                allowNull: true,
                type: Sequelize.STRING
            },
            par_lugar_expedido: {
                allowNull: true,
                type: Sequelize.STRING
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('personas');
    }
};