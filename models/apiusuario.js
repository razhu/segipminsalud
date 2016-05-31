'use strict';
module.exports = function(sequelize, DataTypes) {
  var apiusuario = sequelize.define('apiusuario', {
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return apiusuario;
};