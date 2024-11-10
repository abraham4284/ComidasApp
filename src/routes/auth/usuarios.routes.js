import { Router } from "express";
import {
  getIdUsuarios,
  getUsuarios,
  login,
  logout,
  registroGeneral,
  updatePerfilUsuarios,
  verfiyToken,
} from "../../controllers/auth/usuarios.controllers.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.post("/registro", registroGeneral("cliente"));
router.post("/registro/admin", registroGeneral("admin"));
router.post("/login", login);
router.post("/logout", logout);

router.get("/usuarios",validarToken(["admin"]), getUsuarios);
router.get("/usuarios/:id",validarToken(["cliente","admin"]), getIdUsuarios);


router.put("/usuarios/:id",validarToken(["cliente","admin"]), updatePerfilUsuarios);
router.get("/verify", verfiyToken);

export default router;
