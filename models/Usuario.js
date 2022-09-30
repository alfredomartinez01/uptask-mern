import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* Definiendo el modelo o schema de la base de datos */
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true // Elimina los espacios en blanco del inicio y final
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // No se puede repetir
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false // Por defecto es false
    }

},
    {
        timestamps: true // Crea dos campos: createdAt y updatedAt
    });

/* Encriptar el password */
usuarioSchema.pre('save', async function (next) { // Usamos una función normal para poder usar this
    // Si el password ya está hasheado
    if (!this.isModified('password')) {
        next(); // Aavanzamos al siguiente middleware
    }
    const salt = await bcrypt.genSalt(10); // Generamos el salt
    this.password = await bcrypt.hash(this.password, salt); // Encriptamos el password (this hace referencia al usuario)

});

/* Comprobar password */
usuarioSchema.methods.compararPassword = async function (passwordFormulario) { // Podemos agregar métodos al schema
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Usuario = mongoose.model("Usuario", usuarioSchema); // Creamos el modelo

export default Usuario;