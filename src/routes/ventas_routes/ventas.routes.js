import { Router } from "express";
import { createVentas, getDetalleVentas, getIdVentas, getVentas, getVentasByUsuarios, updateEstadoVentas } from "../../controllers/ventas/ventas.controllers.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/ventas",validarToken(["cliente","admin"]), getVentas);
router.get("/ventas/:id",validarToken(["cliente","admin"]), getIdVentas);
router.get("/ventas/detalles/:id",validarToken(["cliente","admin"]), getDetalleVentas);
router.get("/ventasUsuarios",validarToken(["cliente","admin"]),getVentasByUsuarios)


router.post("/ventas",createVentas)

router.put("/ventas/:id",validarToken(["admin"]),updateEstadoVentas)


export default router;