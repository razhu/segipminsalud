'use strict';
var bcrypt = require('bcrypt');
module.exports = {
  up: function (queryInterface, Sequelize) {
        var fecha = new Date();
        var usuario = 'admin';
        var contrasena = 'admin';
        var url = 'http://test.agetic.gob.bo/';
        var endpoint_base = 'proxy/api/v1/';
        var endpoint_tokens = 'tokens';
        var endpoint_personas = 'segip/personas/';
      return queryInterface.bulkInsert('segips', [{
        usuario: usuario,
        contrasena: bcrypt.hashSync(contrasena, 10),
        url:url,
        endpoint_base:endpoint_base,
        endpoint_tokens:endpoint_tokens,
        endpoint_personas:endpoint_personas,
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
