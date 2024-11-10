import { pool } from "../../db.js";

export const getDomicilios = async (req, res) => {
  try {
    const domicilios = await pool.query("SELECT * FROM domicilios");
    res.json(domicilios[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getDomicilios",
    });
  }
};

export const getIdDomicilios = async(req,res)=>{
  try {
       const { id } = req.params;
       const [ rows ] = await pool.query("SELECT * FROM domicilios WHERE idUsuarios = ?",[id])
       if(rows.length === 0){
         return res.json([])
       }
    
      res.json(rows)
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getDomicilios",
    });
  }
}

export const getIdDomiciliosByUsuarios = async (req, res) => {
  try {
    const { idUsuarios } = req.user;
    const query = "SELECT * FROM domicilios WHERE idUsuarios = ?";
    const [rows] = await pool.query(query, [idUsuarios]);
    if (rows.length <= 0) {
      return res.json([]), console.log("No hay domicilios");
    }

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getIdDomicilios",
    });
  }
};

export const createDomicilios = async (req, res) => {
  try {
    const { codigoPostal, calle, numero, descripcion } = req.body;
    const { idUsuarios } = req.user;
    const query =
      "INSERT INTO domicilios (codigoPostal, calle, numero, descripcion, idUsuarios) VALUES (?,?,?,?,?)";
    const values = [codigoPostal, calle, numero, descripcion, idUsuarios];
    const [result] = await pool.query(query, values);
    const nuevoDomicilio = {
      idDomicilios: result.insertId,
      codigoPostal,
      calle,
      numero,
      descripcion,
    };
    res.status(201).json(nuevoDomicilio);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createDomicilios",
    });
  }
};

export const updateDomicilios = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigoPostal, calle, numero, descripcion } = req.body;
    const query =
      "UPDATE domicilios SET codigoPostal = ?, calle = ?, numero = ?, descripcion = ? WHERE idDomicilios = ?";
    //codigoPostal, calle, numero, descripcion
    const values = [codigoPostal, calle, numero, descripcion, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el cliente a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM domicilios WHERE idDomicilios = ?",
      [id]
    );
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateDomicilios",
    });
  }
};

export const deleteDomicilios = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM domicilios WHERE idDomicilios = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro el domicilio a eliminar" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
