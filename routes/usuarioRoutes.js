import express from 'express';
const router = express.Router(); // Crear un router para manejar el use

import { registrar, autenticar, confirmarCuenta, olvidePassword, validarToken, cambiarPassword} from '../controllers/usuarioController.js';

// Autenticación, registro y confirmación de usuarios
router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmarCuenta);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token')
    .get(validarToken)
    .post(cambiarPassword);
    
export default router;