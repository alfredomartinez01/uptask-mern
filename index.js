import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";

/* Importamos routers */
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express(); // Inicializamos express
app.use(express.json()); // Habilitamos express.json para trarbar con json

dotenv.config();
conectarDB(); // Conectar a la base de datos

// Routing
app.use("/api/usuarios", usuarioRoutes);  // Cuando se haga una petición a /api/usuarios, se ejecuta el archivo usuarioRoutes (router), cualquier tipo de petición con use

const PORT = process.env.PORT || 4000; // Todos los servidores crean esa variable de entorno por defecto
app.listen(PORT, () => {
    console.log('Servidor funcionando');
});