import { pool } from "../../db.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await pool.query("SELECT * FROM productos");
    res.json(productos[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getProductos",
    });
  }
};

export const getProductosComidas = async (req, res) => {
  try {
    const productos = await pool.query(
      "SELECT * FROM productos WHERE categoria = 'comidas' AND estado = 'Disponible' "
    );
    res.json(productos[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getProductosComidas",
    });
  }
};

export const getProductosBebidas = async (req, res) => {
  try {
    const productos = await pool.query(
      "SELECT * FROM productos WHERE categoria = 'bebidas' AND estado = 'Disponible' "
    );
    res.json(productos[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getProductosComidas",
    });
  }
};

export const getIdProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM productos WHERE idProductos = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existe el producto" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getIdProductos",
    });
  }
};

export const createProductos = async (req, res) => {
  try {
    const {
      img,
      CodeBar,
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoria,
      tipoProducto,
      familia,
      estado,
    } = req.body;
    const { idUsuarios } = req.user;
    const query = `
        INSERT INTO productos (img,CodeBar, nombre, descripcion, precioCosto, precioVenta, stock, categoria, tipoProducto, familia, estado, idUsuarios)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
        `;
    const values = [
      img,
      CodeBar,
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoria,
      tipoProducto,
      familia,
      estado,
      idUsuarios,
    ];

    const [result] = await pool.query(query, values);

    const newProducto = {
      idProductos: result.insertId,
      img,
      CodeBar,
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoria,
      tipoProducto,
      familia,
      estado,
      idUsuarios,
    };

    res.json(newProducto);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createProductos",
    });
  }
};

export const updateProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      img,
      CodeBar,
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoria,
      tipoProducto,
      familia,
      estado,
    } = req.body;
    const query = `
      UPDATE productos SET img = ?, CodeBar = ?, nombre = ?, descripcion = ?, precioCosto = ?, 
      precioVenta = ?, stock = ?, categoria = ?, tipoProducto = ?, familia = ?, estado = ? WHERE idProductos = ?
      `;
    const values = [
      img,
      CodeBar,
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoria,
      tipoProducto,
      familia,
      estado,
      id,
    ];

    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      res
        .status(404)
        .json({ error: "No se encontro el producto a actualizar" });
    }

    const [querySelectProducto] = await pool.query(
      "SELECT * FROM productos WHERE idProductos = ?",
      [id]
    );

    res.json(querySelectProducto);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateProductos",
    });
  }
};

export const updateStockProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { stockResultante } = req.body;
    const query = `
       UPDATE productos SET stock = ? WHERE idProductos = ?
      `;
    const [rows] = await pool.query(query, [stockResultante, id]);

    if (rows.affectedRows === 0) {
      res
        .status(404)
        .json({ error: "No se encontro el producto a actualizar" });
    }

    const [querySelectProducto] = await pool.query(
      "SELECT * FROM productos WHERE idProductos = ?",
      [id]
    );

    res.json(querySelectProducto);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateStockProductos",
    });
  }
};

export const updateEstadoProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const query = `
       UPDATE productos SET estado = ? WHERE idProductos = ?
      `;
    const [rows] = await pool.query(query, [estado, id]);

    if (rows.affectedRows === 0) {
      res
        .status(404)
        .json({ error: "No se encontro el producto a actualizar" });
    }

    const [querySelectProducto] = await pool.query(
      "SELECT * FROM productos WHERE idProductos = ?",
      [id]
    );

    res.json(querySelectProducto);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateEstadoProductos",
    });
  }
};

export const deleteProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM productos WHERE idProductos = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro el producto a eliminar" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en deleteProductos",
    });
  }
};
