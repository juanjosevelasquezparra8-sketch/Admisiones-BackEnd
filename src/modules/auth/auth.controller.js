import * as AuthService from './auth.service.js';

/* crear una cuenta nueva */
export async function registrar(req, res) {
    try {
        const { nombre, email, password } = req.body;

        /* Validaciones */
        if (nombre === undefined || email === undefined || password === undefined) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Los campos 'nombre', 'email' y 'password' son obligatorios"
            });
        }

        if (nombre.trim().length < 3 || nombre.trim().length > 100) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'nombre' debe tener entre 3 y 100 caracteres"
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { /* algo@algo.algo */
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "El campo 'email' no tiene un formato válido"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "La contraseña debe tener mínimo 8 caracteres"
            });
        }

        /* no se puede repetir el correo */
        const existe = await AuthService.buscarUsuarioPorEmail(email);
        if (existe) {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: 'Ya existe un usuario con ese correo'
            });
        }

        const usuario = await AuthService.crearUsuario({ nombre: nombre.trim(), email, password });
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Usuario registrado correctamente',
            data: usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Error al registrar el usuario'
        });
    }
}

/* iniciar sesion: si el correo y la contraseña estan bien, devuelve el token */
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (email === undefined || password === undefined) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Los campos 'email' y 'password' son obligatorios"
            });
        }

        const usuario = await AuthService.buscarUsuarioPorEmail(email, true);

        /* mismo mensaje si el correo no existe o si la contraseña esta mal, asi no se da pistas */
        const passwordCorrecta = usuario ? await AuthService.compararPassword(password, usuario.password) : false;
        if (!usuario || !passwordCorrecta) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: 'Correo o contraseña incorrectos'
            });
        }

        if (!usuario.activo) {
            return res.status(403).json({
                statusCode: 403,
                success: false,
                message: 'El usuario está inactivo'
            });
        }

        const token = AuthService.generarToken(usuario);
        res.json({
            statusCode: 200,
            success: true,
            message: 'Inicio de sesión correcto',
            data: {
                token,
                usuario: { _id: usuario._id, nombre: usuario.nombre, email: usuario.email }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Error al iniciar sesión'
        });
    }
}

/* devuelve los datos del usuario que tiene la sesion iniciada (sale del token) */
export async function perfil(req, res) {
    try {
        const usuario = await AuthService.buscarUsuarioPorEmail(req.usuario.email);
        if (!usuario) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        res.json({
            statusCode: 200,
            success: true,
            message: 'Perfil obtenido correctamente',
            data: usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Error al obtener el perfil'
        });
    }
}
