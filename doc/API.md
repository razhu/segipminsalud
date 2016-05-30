# CLIENTE y API REST de datos biométricos.

El servicio web es accesible desde la URL raíz:

```sh
http://localhost:8081/api/v1
```
## Respuestas comunes de los servicios web

Para todos los servicios web, los parámetros deben estar codificados en charset UTF-8.

En caso de error de autenticación, servicio no encontrado, o error interno del servidor, todos los servicios web devuelven las respuestas siguientes:

* Respuesta en el caso de que no se provea el token o éste sea incorrecto:

```
HTTP/1.1 401 Unauthorized

{
    "mensaje": "Token no provisto"
}
```

* Respuesta en el caso de que la estructura del JSON sea incorrecta:

```
HTTP/1.1 400 Bad Request

{
  "mensaje":"Problemas en el formato JSON"
}
```

* Respuesta en el caso de que el servidor no encuentre el servicio solicitado:

```
HTTP/1.1 404 Not Found
```

* En caso que haya un error interno en el servidor:

```
HTTP/1.1 500 Internal Server Error
```


## SERVICIOS WEB

## Servicio Web: Autenticación de usuario

Cabecera y ruta:

```sh
Content-Type: application/json
POST /tokens
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada        | `usuario`    | Nombre de usuario. Máximo 255 caracteres.                                                                                         |
| Entrada        | `contrasena` | Contraseña del usuario. Máximo 255 caracteres.                                                                                    |
| Salida         | `token`      | Cadena de caracteres temporal para acceder a los servicios web. Máximo 255 caracteres. |

Ejemplo con `curl`:

Autenticación de usuario a través del servicio web para el `usuario=prueba` y `contrasena=12345678` de la siguiente forma:

```sh
curl -i -H "Content-Type: application/json" -X POST http://localhost:8081/api/v1/tokens -d '{"usuario":"prueba","contrasena":"12345678"}'
```

Respuesta en el caso de que la autenticación de usuario sea correcta:

```
HTTP/1.1 201 Created

{
  "token":"KgeLAtkJLGXwMswx88QZ"
}
```

Respuesta en el caso que la petición haya sido rechazada por falta del parámetro `usuario`:

```
HTTP/1.1 400 Bad Request

{
  "mensaje":"Falta el parámetro 'usuario'"
}
```

Respuesta en el caso que la petición haya sido rechazada por falta del parámetro `contrasena`:

```
HTTP/1.1 400 Bad Request

{
  "mensaje":"Falta el parámetro 'contrasena'"
}
```

Respuesta en el caso que el usuario o contraseña sean incorrectos:

```
HTTP/1.1 401 Unauthorized

{
  "mensaje":"Nombre de usuario o contraseña inválidos."
}
```

## Servicio Web: Actualizar credenciales de admin

Este servicio permite actualizar los datos del usuario admin para acceso a la api rest.

Cabecera y ruta:

```sh
Content-Type: application/json
x-access-token: token
PUT /usuarios/:id
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada         | `token`      | Cadena de caracteres temporal utilizado para acceder a los servicios web en lugar de usuario y contraseña. Máximo de 255 caracteres. |  
| Entrada         | `:id`      | Es el id del usuario admin a actualizar.|                                                                                 |
| Salida         | `mensaje`       | Mensaje que indica el estado de la petición.

Ejemplo con `curl`, actualizemos credenciales de usuario admin con `:id` = 1

```sh
curl -H "Content-Type: application/json" -H "x-access-token: KgeLAtkJLGXwMswx88QZ" -d '{"usuario": "pepe", "contrasena": "pepe"}' -X PUT "http://localhost:8081/api/v1/usuarios/1"

```

* Respuesta en el caso de que la petición sea correcta:

```
HTTP/1.1 200 OK

  {
    "mensaje": "usuario admin actualizado"
  }
```

## Servicio Web: CRUD para biometricos

Este servicio permite realizar operaciones CRUD sobre los biometricos.


### GET
Cabecera y ruta:

```sh
Content-Type: application/json
x-access-token: token
GET /biometricos
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada         | `token`      | Cadena de caracteres temporal utilizado para acceder a los servicios web en lugar de usuario y contraseña. Máximo de 255 caracteres. |                                                                                   |
| Salida         | `json`       | La petición genera un array de registros en formato json.

Ejemplo con `curl`:

```sh
curl -H "x-access-token: KgeLAtkJLGXwMswx88QZ" -X GET "http://localhost:8081/api/v1/biometricos"

```

* Respuesta en el caso de que la petición sea correcta:

```
HTTP/1.1 200 OK

[
  {
    "biometrico_url": "http://192.168.21.20:5000/",
    "usuario": "root",
    "contrasena": "UTYIUhh7tg",
    "id": 97
  }
]
 
```
### POST
Cabecera y ruta:

```sh
Content-Type: application/json
x-access-token: token
POST /biometricos
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada         | `token`      | Cadena de caracteres temporal utilizado para acceder a los servicios web en lugar de usuario y contraseña. Máximo de 255 caracteres. |  
| Entrada         | `biometrico_url`      | La URL del aparato biometrico. Formato : http://1.2.3.4:5678/ |  
| Entrada         | `usuario`      | El nombre de usuario del aparato biometrico para acceder a su api rest. |  
| Entrada         | `contrasena`      | La contraseña del aparato biometrico para acceder a su api rest.|                                                                                 |
| Salida         | `mensaje`       | Mensaje que indica el estado de la petición.

Ejemplo con `curl`:

```sh
curl -H "Content-Type: application/json" -H "x-access-token: KgeLAtkJLGXwMswx88QZ" -d '{"biometrico_url": "http://1.2.3.4:9000/", "usuario": "pepe", "contrasena": "pepe"}' -X POST "http://localhost:8081/api/v1/biometricos"

```

* Respuesta en el caso de que la petición sea correcta:

```
HTTP/1.1 200 OK

  {
    "mensaje": "biometrico creado"
  }

```
### PUT
Cabecera y ruta:

```sh
Content-Type: application/json
x-access-token: token
PUT /biometricos/:id
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada         | `token`      | Cadena de caracteres temporal utilizado para acceder a los servicios web en lugar de usuario y contraseña. Máximo de 255 caracteres. |  
| Entrada         | `:id`      | Es el id del biometrico que se desea actualizar.|                                                                                 |
| Salida         | `mensaje`       | Mensaje que indica el estado de la petición.

Ejemplo con `curl`, actualizemos un biometrico con `:id` = 144

```sh
curl -H "Content-Type: application/json" -H "x-access-token: KgeLAtkJLGXwMswx88QZ" -d '{"biometrico_url": "http://4.3.2.1:9000/", "usuario": "pepe", "contrasena": "pepe"}' -X PUT "http://localhost:8081/api/v1/biometricos/144"


```

* Respuesta en el caso de que la petición sea correcta:

```
HTTP/1.1 200 OK

  {
    "mensaje": "biometrico actualizado"
  }
```
### DELETE
Cabecera y ruta:

```sh
Content-Type: application/json
x-access-token: token
DELETE /biometricos/:id
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada         | `token`      | Cadena de caracteres temporal utilizado para acceder a los servicios web en lugar de usuario y contraseña. Máximo de 255 caracteres. |  
| Entrada         | `:id`      | Es el id del biometrico que se desea eliminar.|                                                                                 |
| Salida         | `mensaje`       | Mensaje que indica el estado de la petición.

Ejemplo con `curl`, eliminemos un biometrico con `:id` = 144

```sh
curl -H "Content-Type: application/json" -H "x-access-token: KgeLAtkJLGXwMswx88QZ" -X DELETE "http://localhost:8081/api/v1/biometricos/144"


```

* Respuesta en el caso de que la petición sea correcta:

```
HTTP/1.1 200 OK

  {
    "mensaje": "biometrico eliminado"
  }
```

## Servicio Web: Consulta de registros desde una fecha x

Este servicio retorna una lista de registros desde una fecha `inicio`.

Cabecera y ruta:

```sh
Content-Type: application/json
x-access-token: token
GET /registros?inicio=`inicio`
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada        | `inicio`      | Fecha de inicio. Formato `año-mes-dia`. Ej. 2015-07-31                                                                                        |
| Entrada         | `token`      | Cadena de caracteres temporal utilizado para acceder a los servicios web en lugar de usuario y contraseña. Máximo de 255 caracteres. |                                                                                   |
| Salida         | `json`       | La petición genera un array de registros en formato json.

Ejemplo con `curl`:

Consulta de regisros desde la fecha `incio=2016-05-01`:

```sh
curl -H "x-access-token: KgeLAtkJLGXwMswx88QZ" -i "http://localhost:8081/api/v1/registros?inicio=2016-05-01"

```

* Respuesta en el caso de que la petición sea correcta:

```
HTTP/1.1 200 OK

[
  {
    "fecha": "2016-05-16",
    "uid": "pfernandez",
    "registros": [
      {
        "hora": "08:31:25",
        "dispositivo": "OF1IZQ"
      }
    ]
  },
  {
    "fecha": "2016-05-16",
    "uid": "pcallisaya",
    "registros": [
      {
        "hora": "08:36:18",
        "dispositivo": "OF1IZQ"
      }
    ]
  },
  {...}

]
 
```
* Respuesta en el caso de que la petición sea incorrecta:

```
HTTP/1.1 400 Bad Request

{
  "mensaje": "Error en la petición. Revise los parámetros"
}
```


## Servicio Web: recoleccion de registros de los aparatos biometricos

Este servicio permite la recuperacion de datos desde los aparatos biometricos.

Cabecera y ruta:

```sh
Content-Type: application/json
x-access-token: token
GET /recuperacion_registros
```
Parámetros de entrada y salida:

| Tipo           | Parámetro    | Descripción                                                                                                                          |
|----------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Entrada         | `token`      | Cadena de caracteres temporal utilizado para acceder a los servicios web en lugar de usuario y contraseña. Máximo de 255 caracteres. |                                                                                   |
| Salida         | `mensaje`       | Mensaje que indica el estado de la petición.

Ejemplo con `curl`:

```sh
curl -H "x-access-token: KgeLAtkJLGXwMswx88QZ" -X GET "http://localhost:8081/api/v1/recuperacion_registros"

```

* Respuesta en el caso de que la petición sea correcta:

```
HTTP/1.1 200 OK

  {
    "mensaje": "proceso de recoleccion de datos"
  }
```