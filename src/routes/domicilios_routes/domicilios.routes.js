import { Router } from "express";
import {
  createDomicilios,
  deleteDomicilios,
  getDomicilios,
  getIdDomicilios,
  getIdDomiciliosByUsuarios,
  updateDomicilios,
} from "../../controllers/domicilios/domicilios.controllers.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/domicilios",validarToken(["cliente","admin"]), getDomicilios);
router.get("/domicilios/usuarios",validarToken(["cliente","admin"]), getIdDomiciliosByUsuarios);

router.get("/domicilios/:id",validarToken(["cliente","admin"]), getIdDomicilios);

router.post("/domicilios", validarToken(["cliente"]), createDomicilios);
router.put("/domicilios/:id", validarToken(["cliente"]), updateDomicilios)

router.delete("/domicilios/:id", validarToken(["cliente"]), deleteDomicilios)


export default router;
