'use strict';
var base64 = require('base-64');
var utf8 = require('utf8');
module.exports = {
  up: function (queryInterface, Sequelize) {
        var fecha = new Date();
        var usuario = 'admin';
        var contrasena = base64.encode(utf8.encode('admin'));
        var url = 'http://test.agetic.gob.bo/';
        var endpoint_base = 'proxy/api/v1/';
        var endpoint_tokens = 'tokens';
        var endpoint_personas = 'segip/personas/';
        var endpoint_fecha = '?fecha_nacimiento=';
      return queryInterface.bulkInsert('segips', [{
        usuario: usuario,
        contrasena: contrasena,
        url:url,
        endpoint_base:endpoint_base,
        endpoint_tokens:endpoint_tokens,
        endpoint_personas:endpoint_personas,
        endpoint_fecha:endpoint_fecha,
        createdAt: fecha,
        updatedAt: fecha
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
contrasena: base64.encode(utf8.encode(req.body.contrasena)) 
      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
