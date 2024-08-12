# Ground Footwear Online Store

Este proyecto es una tienda online para calzado barefoot, y adiciona el manejo de usuarios, logins, y autenticaciones, adem[as de permitir manejar productos y carritos (desarrollo previamente realizado) 

La aplicación permite a los usuarios registrarse, iniciar sesión, verificar su sesión actual con distintos roles, y cerrar sesión.

## Funcionalidades

- **Registro de Usuarios**: Permite a los usuarios registrarse proporcionando su nombre, correo electrónico, edad y contraseña.
- **Inicio de Sesión**: Los usuarios pueden iniciar sesión utilizando su correo electrónico y contraseña. Se genera un token JWT para autenticar las solicitudes.
- **Verificación de Sesión**: Los usuarios pueden verificar su sesión actual proporcionando el token JWT en las solicitudes.
- **Cierre de Sesión**: Permite a los usuarios cerrar sesión, eliminando el token JWT de las cookies.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para construir aplicaciones web y API RESTful.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar usuarios y productos.
- **Mongoose**: Para interactuar con MongoDB desde Node.js.
- **Passport.js**: Middleware para autenticación, utilizado con estrategias de autenticación local y JWT.
- **bcrypt**: Librería para encriptar y comparar contraseñas de manera segura.
- **jsonwebtoken (JWT)**: Utilizado para generar y verificar tokens JWT.
- **express-handlebars**: Motor de plantillas para renderizar vistas en el servidor.
- **Socket.IO**: Biblioteca para comunicaciones en tiempo real (actualmente comentada en el código).
- **Postman**: Herramienta utilizada para probar las API.

## Instalación y uso

Luego de clonar el repositorio `(git clone <URL del repositorio>)`, instalar las dependencias `(npm install)`, e iniciar el servidor `(npm run dev)`, abre tu navegador y navega a [http://localhost:8000](http://localhost:8000 "http://localhost:8000") para ver la página principal.

## Pruebas con Postman

### Registro de Usuario:
* Método: POST
* Ruta: /api/auth/register
* Cuerpo de la solicitud:
``{
  "first_name": "Nombre",
  "last_name": "Apellido",
  "email": "correo@ejemplo.com",
  "age": 30,
  "password": "contraseña"
}``

### Login de usuario:
* Método: POST
* Ruta: /api/auth/login
* Cuerpo de la solicitud:
``{
  "email": "correo@ejemplo.com",
  "password": "contraseña"
}``

### Verificación de usuario logueado:
* Método: GET
* Ruta: /api/auth/current
* Cuerpo de la solicitud:
* Encabezado: `Cookie: token=<token-jwt>`

### Logout y eliminación de cookie generada:
* Método: GET
* Ruta: /api/auth/logout



### Endpoints del sitio online

- API de Productos
- GET /api/products - Obtiene todos los productos.
- GET /api/products/:id - Obtiene un producto por su ID.
- POST /api/products - Agrega un nuevo producto.
- PUT /api/products/:id - Actualiza un producto existente por su ID.
- DELETE /api/products/:id - Elimina un producto por su ID.

### API de Carritos
- POST /api/carts - Crea un nuevo carrito.
- GET /api/carts/:cid - Obtiene un carrito por su ID.
- POST /api/carts/:cid/product/:pid - Agrega un producto al carrito.

### Views
- GET / - Página principal de la tienda.
- GET /products - Página que muestra la lista de productos utilizando Handlebars.
- GET /realTimeProducts - Página que muestra la lista de productos en tiempo real utilizando WebSockets. Incluye un formulario para añadir productos nuevos, y botones para eliminar productos ya existenes.


💻 Creado por Federico Rossi
