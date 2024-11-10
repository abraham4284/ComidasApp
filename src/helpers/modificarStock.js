import { pool } from "../db.js";

export const modificarStockVenta = async (idProductos, stock) => {
  try {
    const foundProduct = await pool.query(
      "SELECT stock FROM productos WHERE idProductos = ?",
      [idProductos]
    );
    const stockActual = foundProduct[0][0].stock;
    const stockBaja = stock;
    const resultadoFinal = stockActual - stockBaja;

    //Modifico el stock;
    await pool.query("UPDATE productos set stock = ? WHERE idProductos = ?", [
      resultadoFinal,
      idProductos,
    ]);
    console.log("Stock modificado");
  } catch (error) {
    console.log(error);
    console.log("Error en libs modificarStock Venta");
  }
};


export const modificarStockPorVentaAnulada = async (estado, idProductos, stock)=>{
  try {
      if(estado === "Anulado"){
        const productoEncontrado = await pool.query("SELECT * FROM productos WHERE idProductos = ?",[idProductos])
        let stockActualProducto = productoEncontrado[0][0].stock;
        console.log(stock,'stock por parametro')
        let resultadoFinal = parseFloat(stockActualProducto) + parseFloat(stock);
        console.log(resultadoFinal,'Soy el resultado final')
        const [ rows ] = await pool.query("UPDATE productos SET stock = ? WHERE idProductos = ?",[resultadoFinal,idProductos])
        if(rows.affectedRows === 0){
          console.log("la actualizacion no se hizo")
        }
        return {message: "Stock actualizado correctamente"}
      }
    
  } catch (error) {
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en modificarStockPorVentaAnulada",
    });
  }
}
