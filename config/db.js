import mongoose from 'mongoose';    // Importamos mongoose

const conectarDB = async () => {    // Creamos una función asíncrona
    try {
        await mongoose.connect(process.env.MONGO_URI, {    // Conectamos a la base de datos
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