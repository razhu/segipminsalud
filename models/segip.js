'use strict';
module.exports = function(sequelize, DataTypes) {
  var segip = sequelize.define('segip', {
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    url: DataTypes.STRING,
    endpoint_base: DataTypes.STRING,
    endpoint_tokens: DataTypes.STRING,
    endpoint_personas: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return segip;
};