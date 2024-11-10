import { pool } from "../../db.js";

export const getNegocios = async (req, res) => {
  try {
    const negocios = await pool.query("SELECT * FROM negocios");
    res.json(negocios[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getNegocios",
    });
  }
};

export const getNegociosByUsuarios = async (req, res) => {
  try {
    const { idUsuarios } = req.user;
    const negociosUser = await pool.query(
      "SELECT * FROM negocios WHERE idUsuarios = ?",
      [idUsuarios]
    );
    if (negociosUser === 0) {
      console.log("Este usuario no tiene un negocio creado");
    }

    res.json(negociosUser[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getNegocios",
    });
  }
};

export const createNegocios = async (req, res) => {
  try {
    const { nombre, rubro, descripcion, img, estado } = req.body;
    const { idUsuarios } = req.user;
    const fecha = new Date().toISOString().slice(0, 10);
    const query = `
      INSERT INTO negocios (nombre, rubro, descripcion, img, fecha, estado, idUsuarios) VALUES (?,?,?,?,?,?,?)
      `;
    const values = [nombre, rubro, descripcion, img, fecha, estado, idUsuarios];

    const [result] = await pool.query(query, values);

    const newNegocio = {
      idNegocios: result.insertId,
      nombre,
      rubro,
      descripcion,
      img,
      fecha,
      estado,
    };

    res.status(201).json(newNegocio);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createNegocios",
    });
  }
};

export const updateNegocios = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, rubro, descripcion, img, estado } = req.body;
    console.log(req.body);
    const query = `
         UPDATE negocios SET nombre = ?, rubro = ?, descripcion = ?, img = ?, estado = ?  WHERE idNegocios = ?
         `;
    const values = [nombre, rubro, descripcion, img, estado, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el negocio a actualizar" });
    }

    const [rowsSelectNewNegocio] = await pool.query(
      "SELECT * FROM negocios WHERE idNegocios = ?",
      [id]
    );

    res.json(rowsSelectNewNegocio[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateNegocios",
    });
  }
};

export const updateEstadoNegocios = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const query = "UPDATE negocios SET estado = ? WHERE idNegocios = ?";
    const [rows] = await pool.query(query, [estado, id]);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el negocio a actualizar" });
    }

    const [rowsSelectNewNegocio] = await pool.query(
      "SELECT * FROM negocios WHERE idNegocios = ?",
      [id]
    );

    res.json(rowsSelectNewNegocio[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateNegocios",
    });
  }
};
