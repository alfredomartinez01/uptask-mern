import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";

const app = express();
dotenv.config();
conectarDB(); // Conectar a la base de datos

const PORT = process.env.PORT || 4000; // Todos los servidores crean esa variable de entorno por defecto

app.listen(PORT, () => {
    console.log('Servidor funcionando');
});