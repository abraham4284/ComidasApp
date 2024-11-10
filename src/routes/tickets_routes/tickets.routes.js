import { Router } from "express";
import { validarToken } from "../../middlewares/validarToken.js";
import { generarTicketVenta } from "../../controllers/tickets/GenerarTickets.js";
import { generarComada } from "../../controllers/tickets/GenerarComanda.js";

const router = Router();

router.get("/ticket/:id", validarToken(["admin"]),generarTicketVenta)
router.get("/comanda/:id", validarToken(["admin"]),generarComada)


export default router;