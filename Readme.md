# UPTASK MERN

## MERN

---

MERN es una sigla que se utiliza para referirse a un conjunto de tecnologías que se utilizan para crear aplicaciones web y móviles. Estas tecnologías son:

- **MongoDB** (Base de datos NoSQL, orientada a documentos y grandes cantidades de datos, los datos son almacenados en un formato llamado BSON, las tablas se llaman **Colecciones** y los registros se llaman **documentos**)
- **ExpressJS** (Es una herramienta para crear un servidor en JavaScript, no tiene un sistena de vistas definido, tampoco ORM o autenticación, mucho depende del desarrollador.)
- **ReactJS**
- **NodeJS** (Entorno de ejecución de JavaScript que se ejecuta en el servidor, entre sus ventajas se encuentra la gran cantidad de librerías. Puede consular Base de Datos, autenticar usuarios, manejar rutas, enviar correos, etc.)

Sin embargo, se puede crear una aplicación de React en conjunto con Django, Rails o Laravel.

## Creación se servidor con ExpressJS

---

Primero creamos una carpeta donde se va contener el backend y frontend, después creamos una carpeta para el backend. En esta carpeta iniciamos un proyecto de node con:

```bash
npm init
```

Después instalamos express con el siguiente comando:

```bash
npm install express
```

Creamos un archivo llamado **index.js** y escribimos el siguiente código:

```javascript
const express = require('express');
const app = express();

app.listen(4000, () => {
    console.log('Servidor funcionando');
});
```

Para poder correr el servidor y que se reinicie automáticamente cuando tenemos un cambio en el código, instalamos la dependencia **nodemon** como depdendencia única de desarrollo con el siguiente comando:

```bash
npm i -D nodemon
```

Ahora configuramos el comando para correr el archivo **index.js** en el archivo **package.json**:

```json
"scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
},
```

### Configuración de los imports en vez de require

Existen dos formas de hacerlo:

- Cambiando el nombre de los archivos a ***.m.js**.
- Agregando "type" : "module" en el archivo **package.json**.

## Conexión con la base de datos

---

Se instala la dependencia **mongoose** con el siguiente comando:

```bash
npm i mongoose
```

Después creamos una carpeta llamada config, donde crearemos el archivo **db.js**. En este archivo escribimos el siguiente código:

```javascript
import mongoose from 'mongoose';    // Importamos mongoose

const conectarDB = async () => {    // Creamos una función asíncrona
    try {
        await mongoose.connect(process.env.DB_MONGO, {    // Conectamos a la base de datos
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);    // Detenemos la aplicación
    }
}

export default conectarDB;
```

En el archivo **index.js** importamos la función **conectarDB** y la ejecutamos:

```javascript
import conectarDB from './config/db.js';

conectarDB();
```

Ahora creamos la variable de entorno que contendrá el string de conexión a la base de datos. Para esto creamos un archivo llamado **.env** y escribimos el valor del string. Sin antes haber instalado la deeependencia **dotenv** con el siguiente comando:

```bash
npm i dotenv
```

## Model View Controller

---

Es un patrón de arquitectura de software que permite la separación de obligaciones de cada pieza de tu código.

Enfatiza la separación de la lógica de programación con la presentación.

MVC es la aquitectura más común hoy en día tanto para web como para aplicaciones móviles. Y se utiliza en cualquier lenguaje de programación.

### Ventajas

- No tendrá mejor performance, pero si tendrá un código más limpio y fácil de mantener.
- Al implementar una arquitectura probada como MVC, todos los programadores sabrán donde encontrar cada pieza de código.
- Aprende MVC y cualquier framework MVC te será fácil de aprender.
  
### Modelo

Encargado de todo lo relacionado a los datos, base de datos y el CRUD.

El modelo se encargará de consultar una base de datos pero no se encargará de mostrar los datos.

### Vista

Se encarga de todo lo que se ve en pantalla (HTML).

El modelo se encargará de consultar la base de datos pero la vista es la que se encargará de mostrar los resultados.

En el caso de React, React es la vista.

### Controlador

Es el que comunica el **modelo** con la **vista**, antes de que el **modelo** consulte a la base de datos, el **controlador** es el encargado de llamarlo, una vez que el **modelo** ya consultó a la base de datos, es el **controlador** quien le comunica a la **vista** los datos para que los muestre.

### Router

Encargado de registrar todas las URL's o endspoints que soporta nuestra apliación.

## Almacenando contraseñas

---

Para almacenar contraseñas en la base de datos, se debe encriptar la contraseña. Para esto se utiliza la dependencia **bcryptjs** con el siguiente comando:

```bash
npm i bcrypt
```

**Nota:** Una vez hasheado, no hay forma de desencriptar la contraseña, solo compararla.

## Generación de tokens con jsonwebtoken

---

Para generar tokens se utiliza la dependencia **jsonwebtoken** con el siguiente comando:

```bash
npm i jsonwebtoken
```
