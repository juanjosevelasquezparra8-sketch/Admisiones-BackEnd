import { Router } from "express";

import { registrar, login, perfil } from "./auth.controller.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";

const router = Router();


router.post("/register/", registrar);
router.post("/login/", login);
router.get("/me/", verificarToken, perfil);   /* esta si necesita token */

export default router;
