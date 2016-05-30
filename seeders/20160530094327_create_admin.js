'use strict';
var bcrypt = require('bcrypt');
module.exports = {
  up: function (queryInterface, Sequelize) {
        var fecha = new Date();
        var usuario = 'admin';
        var contrasena = 'admin'
      return queryInterface.bulkInsert('usuarios', [{
        usuario: usuario,
        contrasena: bcrypt.hashSync(contrasena, 10),
        createdAt: fecha,
        updatedAt: fecha
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
