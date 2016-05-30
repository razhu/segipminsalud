'use strict';
var bcrypt = require('bcrypt');
module.exports = {
  up: function (queryInterface, Sequelize) {
        var fecha = new Date();
        var usuario = 'admin';
        var contrasena = 'admin';
        var url = 'http://test.agetic.gob.bo/';
        var endpoint = 'proxy/api/v1/segip/personas/';
      return queryInterface.bulkInsert('segips', [{
        usuario: usuario,
        contrasena: bcrypt.hashSync(contrasena, 10),
        url:url,
        endpoint:endpoint,
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
