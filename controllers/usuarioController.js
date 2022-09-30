import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res) => {
    // Evitando que haya registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
        const error = new Error('El usuario ya está registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new Usuario(req.body); // Creamos el objeto con base al modelo (parecido a instancia)
        usuario.token = generarId(); // Generamos el token para activar cuenta
        const usuarioAlmacenado = await usuario.save(); // Guardamos el usuario en la base de datos

        res.json({ msg: 'Usuario creado correctamente' });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al almacenarlo');
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    // Comprobando si está registrado
    if (!usuario) {
        const error = new Error('El usuario no está registrado');
        return res.status(404).json({ msg: error.message });
    }

    // Comprobando si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    // Comprobando el password
    if (!await usuario.compararPassword(password)) {
        const error = new Error('El password es incorrecto');
        return res.status(401).json({ msg: error.message });
    }

    res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario._id)
    });
}

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ token });

    if (!usuario) {
        const error = new Error('Token no válido');
        return res.status(403).json({ msg: error.message });
    }

    try {
        usuario.confirmado = true;
        usuario.token = ""
        await usuario.save();

        res.json({ msg: 'Usuario confirmado correctamente' });

    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error('El usuario no está registrado');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();

        res.json({ msg: 'Hemos enviado un email con las intrucciones.' });

    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
}

const validarToken = async (req, res) => {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ token });

    if (!usuario) {
        const error = new Error('Token no válido');
        return res.status(403).json({ msg: error.message });
    }

    res.json({ msg: 'Token válido' });
}

const cambiarPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });
 
    if (!usuario) {
        const error = new Error('Token no válido');
        return res.status(403).json({ msg: error.message });
    }

    try {
        usuario.password = password;
        usuario.token = "";
        await usuario.save();

        res.json({ msg: 'Contraseña cambiada correctamente' });

    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
}

export {
    registrar,
    autenticar,
    confirmarCuenta,
    olvidePassword,
    validarToken,
    cambiarPassword
}