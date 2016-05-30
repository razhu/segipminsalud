'use strict';
module.exports = function(sequelize, DataTypes) {
  var usuario = sequelize.define('usuario', {
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usuario;
};