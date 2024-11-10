import { Router } from "express";
import { validarToken } from "../../middlewares/validarToken.js";
import { createNegocios, getNegocios, getNegociosByUsuarios, updateEstadoNegocios, updateNegocios } from "../../controllers/negocios/negocios.controllers.js";

const router = Router();

router.get("/negocios",getNegocios);
router.get("/negocios/usuarios",validarToken(["cliente","admin"]), getNegociosByUsuarios)

router.post("/negocios",validarToken(["cliente","admin"]), createNegocios)
router.put("/negocios/:id",validarToken(["cliente","admin"]),updateNegocios)
router.patch("/negociosEstado/:id",validarToken(["cliente","admin"]),updateEstadoNegocios)


export default router;