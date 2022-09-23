import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";

const app = express();
dotenv.config();
conectarDB(); // Conectar a la base de datos

app.listen(4000, () => {
    console.log('Servidor funcionando');
});