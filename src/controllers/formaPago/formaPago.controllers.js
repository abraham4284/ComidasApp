import { pool } from "../../db.js";

export const getFormasPago = async (req, res) => {
  try {
    const formaPagos = await pool.query("SELECT * FROM formapago");
    res.json(formaPagos[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getFormasPago",
    });
  }
};

export const getFormasPagoByUsuarios = async (req, res) => {
  try {
    const { idUsuarios } = req.user;
    const formaPagos = await pool.query("SELECT * FROM formapago WHERE idUsuarios = ?",[idUsuarios]);
    res.json(formaPagos[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getFormasPago",
    });
  }
};




export const createFormaPago = async (req, res) => {
  try {
    const { idUsuarios } = req.user;
    const { nombre } = req.body;
    const [result] = await pool.query(
      "INSERT INTO formapago (nombre, idUsuarios) values(?,?)",
      [nombre, idUsuarios]
    );
    const newFormaPago = {
      idFormaPago: result.insertId,
      nombre,
    };

    res.status(201).json(newFormaPago);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getFormasPago",
    });
  }
};

export const updateFormaPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = `
         UPDATE formapago SET nombre = ? WHERE idFormaDePago = ?
        `;
    const value = [nombre, id];
    const [rows] = await pool.query(query, value);

    if (rows.affectedRows === 0) {
      res
        .status(404)
        .json({ message: "No se encontro la forma de pago a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM formapago WHERE idformaDePago = ?",
      [id]
    );
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateFormaPago",
    });
  }
};

export const deleteFormaPago = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM formapago WHERE idFormaDePago = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro el formadepago a eliminar" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en deleteFormaPago",
    });
  }
};
