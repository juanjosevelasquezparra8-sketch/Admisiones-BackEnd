import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "./usuarios.model.js";

/* busca un usuario por correo; con conPassword trae tambien la contraseña (para el login) */
export async function buscarUsuarioPorEmail(email, conPassword = false) {
    const consulta = Usuario.findOne({ email: email.trim().toLowerCase() });
    return conPassword ? await consulta.select("+password") : await consulta;
}

export async function crearUsuario({ nombre, email, password }) {
    /* encriptamos la contraseña antes de guardarla (el 10 es que tan fuerte se encripta) */
    const passwordEncriptada = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: passwordEncriptada });

    /* devolvemos el usuario sin la contraseña */
    const { password: _, ...usuarioSinPassword } = usuario.toObject();
    return usuarioSinPassword;
}

/* compara la contraseña que escribio la persona con la encriptada que esta guardada */
export async function compararPassword(password, passwordEncriptada) {
    return await bcrypt.compare(password, passwordEncriptada);
}

/* crea el token con el id y el correo del usuario; dura lo que diga JWT_EXPIRES_IN */
export function generarToken(usuario) {
    return jwt.sign(
        { id: usuario._id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );
}
