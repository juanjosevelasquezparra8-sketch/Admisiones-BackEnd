import jwt from "jsonwebtoken";

/*
  Este middleware va ANTES de las rutas protegidas.
  Revisa que la peticion traiga el token en el header:
      Authorization: Bearer EL_TOKEN
  Si esta bien deja pasar, si no responde 401.
*/
export function verificarToken(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            statusCode: 401,
            success: false,
            message: 'No hay token, primero inicia sesión'
        });
    }

    const token = header.split(" ")[1]; /* quitamos la palabra "Bearer" */

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET); /* si el token es falso o vencio, salta al catch */
        req.usuario = datos; /* guardamos quien es, por si la ruta lo necesita */
        next();              /* todo bien, que siga a la ruta */
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            success: false,
            message: 'Token inválido o vencido, vuelve a iniciar sesión'
        });
    }
}
