'use strict';
module.exports = function(sequelize, DataTypes) {
    var persona = sequelize.define('persona', {
        id_persona: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        documento_identidad: DataTypes.STRING,
        complemento_documento: DataTypes.STRING,
        nombres: DataTypes.STRING,
        primer_apellido: DataTypes.STRING,
        segundo_apellido: DataTypes.STRING,
        casada_apellido: DataTypes.STRING,
        fecha_nacimiento: DataTypes.STRING

    }, {createdAt: 'fecha_creacion',
        updatedAt: 'fecha_modificacion',
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                }
            }
        });
    return persona;
};