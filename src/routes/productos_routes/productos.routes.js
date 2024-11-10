import { Router } from "express";
import { createProductos, deleteProductos, getIdProductos, getProductos, getProductosBebidas, getProductosComidas, updateEstadoProductos, updateProductos, updateStockProductos } from "../../controllers/productos/productos.controllers.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();


router.get("/productos",getProductos)
router.get("/productos/comidas",getProductosComidas);
router.get("/productos/bebidas",getProductosBebidas);
router.get("/productos/:id",getIdProductos)

router.post("/productos",validarToken(["cliente","admin"]), createProductos)
router.put("/productos/:id",validarToken(["cliente","admin"]), updateProductos)
router.put("/productoStock/:id",validarToken(["cliente","admin"]), updateStockProductos)
router.put("/productoEstado/:id",validarToken(["cliente","admin"]), updateEstadoProductos)
router.delete("/productos/:id",validarToken(["cliente","admin"]), deleteProductos)



export default router;