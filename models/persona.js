'use strict';
module.exports = function(sequelize, DataTypes) {
  var persona = sequelize.define('persona', {
    complemento_visible: DataTypes.STRING,
    numero_documento: DataTypes.STRING,
    complemento: DataTypes.STRING,
    nombres: DataTypes.STRING,
    primer_apellido: DataTypes.STRING,
    segundo_apellido: DataTypes.STRING,
    apellido_esposo: DataTypes.STRING,
    domicilio: DataTypes.STRING,
    fecha_nacimiento: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return persona;
};