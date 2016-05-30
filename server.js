//////////////////////////////////////////////// OBTENER PAQUETES
var express = require('express');
var app = express();
var Client = require('node-rest-client').Client;
var client = new Client();
var model = require('./models');// modelos
var port = process.env.PORT || 5000;
//paquetes para api rest
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // para crear, firmar, y verificar tokens
var config2 = require('./config/config2');
var cors = require('cors');
var bcrypt = require('bcrypt');
// para base64
var base64 = require('base-64');
var utf8 = require('utf8');
//validador
var validator = require('is-my-json-valid');
app.use(cors());
var validate = validator({
    required: true,
    type: 'object',
    properties: {
        checkpresence: {
            required: true,
            type: 'string'
        }
    }
});
//////////////////////////////////////////////// CONFIGURACION
// usamos body parser para obtener info de los parametros via POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// secret para jwt
app.set('superSecreto', config2.secret); // variable secreta
// usamos morgan para imprimir logs en development
app.use(morgan('dev'));
//////////////////////////////////////////////// RUTAS
// ruta basica (http://localhost:8081)
app.get('/', function(req, res) {
    res.header('Content-Type', 'application/json');
    res.status(403).json({ mensaje: 'Token no provisto' });
});

//////////////////////////////////////////////// INSTANCIA DE 'ROUTES' PARA LAS RUTAS DE LA API
var apiRoutes = express.Router();
//////////////////////////////////////////////// INICIO AUTENTICACION (no se requiere middleware pues no es una ruta protegida)
apiRoutes.post('/tokens', function(req, res) {
    model.usuario.findOne({
        where: { usuario: req.body.usuario }
    }).then(function(usuario) {
        if (!validate({ checkpresence: req.body.usuario })) {
            res.status(400).json({ mensaje: 'Falta el parámetro \'usuario\'' });
        } else if (!validate({ checkpresence: req.body.contrasena })) {
            res.status(400).json({ mensaje: 'Falta el parámetro \'contrasena\'' });
        } else if (!usuario) {
            res.status(401).json({ mensaje: "Nombre de usuario o contraseña inválidos." });
        } else if (usuario) {
            // verifica si las contraseñas son iguales
            if (!bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
                res.status(401).json({ mensaje: "Nombre de usuario o contraseña inválidos." });
            } else {

                // si el usuario y al contraseña son correctas, se crea un token
                var token = jwt.sign({ "usuario": usuario.usuario }, app.get('superSecreto'), {
                    expiresInMinutes: 1440 // token expira en 24 horas
                });
                res.header('Content-Type', 'application/json');
                res.status(201).json({
                    token: token
                });
            }
        } else {
            res.status(500).json({ mensaje: 'error interno' });
        }
    }).catch(function(error) {
        console.log(error.stack);
        res.status(500).json({ mensaje: error.message });
    });
});
//////////////////////////////////////////////// FIN AUTENTICACION 



//////////////////////////////////////////////// INICIO MIDDLEWARE QUE VERIFICA EL TOKEN 
apiRoutes.use(function(req, res, next) {
    // busca un token en la cabecera o para metros de url o los parametros de POST 
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    // decode token
    if (token) {// verifica la palabra secreta y el periodo de expiracion del token
        jwt.verify(token, app.get('superSecreto'), function(err, decoded) {
            if (err) {
                return res.status(401).json({ mensaje: 'Token o nombre de usuario inválidos.' });
            } else {
                // si todo esta bien, se almacena el token para su uso en otras rutas
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // si no hay token, se muestra un error.
        return res.status(403).send({
            mensaje: 'Token no provisto'
        });
    }
});
//////////////////////////////////////////////// FIN MIDDLEWARE QUE VERIFICA EL TOKEN 
//////////////////////////////////////////////// INICIO RECUPERACION REGISTROS 
apiRoutes.get('/personas', function(req, res) {
    //model.segip.findAll({}).then().catch();
    model.segip.findOne({
        order: 'id DESC'
    }).then(result => {
        //argumentos usuario y password para cada aparato biometrico
        var url = result.url;
        var endpoint_base = result.endpoint_base;
        var endpoint_tokens = result.endpoint_tokens;
        var endpoint_personas = result.endpoint_personas;
        var endpoint_fecha = result.endpoint_fecha;
        var args1 = {
            headers: { "Content-Type": "application/json" },
            data: { "usuario": "admin", "contrasena": "admin" }
        };
        // autenticacion
        client.post(url + endpoint_base + endpoint_tokens, args1, function(data, response) {
            var token = data.token;
            var args = {
                headers: { "x-access-token": token }
            };
            client.get(url + endpoint_base + endpoint_personas + req.query.ci + endpoint_fecha + req.query.fecha_nacimiento, args, function(data, response) {
                if (!data.success) {
                    res.status(403).json({ mensaje: "Error en la petición. Revise los parámetros" });
                } else {
                    model.persona.findOrCreate
                        ({
                            where: {
                                complemento_visible: data.persona.ComplementoVisible,
                                numero_documento: data.persona.NumeroDocumento,
                                complemento: data.persona.Complemento,
                                nombres: data.persona.Nombres,
                                primer_apellido: data.persona.PrimerApellido,
                                segundo_apellido: data.persona.SegundoApellido,
                                apellido_esposo: data.persona.ApellidoEsposo,
                                domicilio: data.persona.Domicilio
                            }
                        });
                    res.status(201).json({ mensaje: "Se guardo el nuevo registro" });
                }
            }).on('error', function(err) {
                console.log('No se pudo recuperar datos desde segip', err.request.options);

            });
        }).on('error', function(err) {
            console.log('No se pudo obtener el token desde segip', err.request.options);
        });
    }).catch(e => {
        console.log(e);
    });

});
//////////////////////////////////////////////// FIN RECUPERACION REGISTROS 

//////////////////////////////////////////////// INICIO DECLARACION api/v1
app.use('/api/v1', apiRoutes);
app.use(function(req, res, next) {
    res.status(404).send('Lo sentimos, no se pudo encontrar el recurso!');

});
//////////////////////////////////////////////// FIN DECLARCION api/v1

//////////////////////////////////////////////// INICIO VERIFICA SI HAY ERRORES EN FORMATO JSON
app.use(function(err, req, res, next) {
    if (err instanceof SyntaxError) {
        res.status(400).json({ mensaje: "Problemas en el formato JSON" });
    } else {
        res.status(500).send('Error interno!');
        console.error(err.stack);
        //next();
    }
});
//////////////////////////////////////////////// FIN VERIFICA SI HAY ERRORES EN FORMATO JSON

//////////////////////////////////////////////// INICIO INICIA EL SERVIDOR
app.listen(port);
console.log('La magia esta en... http://localhost:' + port);
//////////////////////////////////////////////// FIN INICIA EL SERVIDOR