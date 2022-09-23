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