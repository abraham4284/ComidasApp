import { Router } from "express";
import {
  createFormaPago,
  deleteFormaPago,
  getFormasPago,
  getFormasPagoByUsuarios,
  updateFormaPago,
} from "../../controllers/formaPago/formaPago.controllers.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/formaPago", getFormasPago);
router.get("/formaPago/usuarios",validarToken(["cliente"]),getFormasPagoByUsuarios);

router.post("/formaPago", validarToken(["cliente","admin"]), createFormaPago);
router.put("/formaPago/:id", validarToken(["cliente","admin"]), updateFormaPago);
router.delete(
  "/formaPago/:id",
  validarToken(["cliente","admin"]),
  deleteFormaPago
);

export default router;
