import express from "express";
import cors from "cors";
import facultadesRoutes from "./modules/facultades/facultades.routes.js";
import programasRoutes from "./modules/programas/programas.routes.js";
import estudiantesRoutes from "./modules/estudiantes/estudiantes.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { verificarToken } from "./middlewares/auth.middleware.js";

const app = express();

app.use(cors()); /* deja que el frontend (React) pueda pedirle datos a la API */

app.use(express.json()); /* Middleware para parsear el cuerpo de las solicitudes */
/* Facultades */


/* Login (estas rutas NO piden token) */
app.use("/api/auth", authRoutes);

/* Estas rutas SI piden token: primero pasa por verificarToken */
app.use("/api/facultades", verificarToken, facultadesRoutes);

app.use("/api/programas", verificarToken, programasRoutes);

app.use("/api/estudiantes", verificarToken, estudiantesRoutes);

app.get("/api/health", (req, res) => {

    res.json({
        status: "ok",
        success: true,
        message: "API functioning correctly",
        version: "1.0.0"
    });

});

export default app;