import { pool } from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../libs/createAccessToken.js";
import { fechaLocal } from "../../helpers/formatearFecha.js";
import { TOKEN_SECRET } from "../../config.js";

export const registroGeneral = (rol) => {
  return async (req, res) => {
    try {
      const {
        img,
        nombre,
        apellido,
        email,
        DNI,
        telefono,
        username,
        password,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Verifico si el usuario existe
      const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE username = ?",
        [username]
      );

      if (rows.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // Creamos el registro
      const queryInserUser = `
      INSERT INTO usuarios (rol, img, nombre, apellido, email, DNI , telefono, username, password )
      VALUES (?,?,?,?,?,?,?,?,?)`;
      const values = [
        rol,
        img,
        nombre,
        apellido,
        email,
        DNI,
        telefono,
        username,
        hashedPassword,
      ];
      const [result] = await pool.query(queryInserUser, values);

      if (result.error) {
        throw result.error;
      }

      const dataToken = {
        idUsuarios: result.insertId,
        img,
        username,
        rol,
      };

      const token = createAccessToken(dataToken);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 100,
        path: "/",
      });

      console.log(token);

      res.status(201).json(dataToken);
    } catch (error) {
      res.status(500).json({ error: "error en el servidor" });
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registroGeneral",
      });
    }
  };
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { HoyfechaLocal } = fechaLocal();

    // buscamos el username del usuario si es que existe
    const [rowsUser] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [username]
    );
    if (rowsUser.length === 0) {
      return res
        .status(404)
        .json({ message: "Usuario o contraseña incorrecta" });
    }

    // comparamos las contraseñas
    const storePassword = rowsUser[0].password;
    const validPassword = await bcrypt.compare(password, storePassword);

    if (!validPassword) {
      return res
        .status(404)
        .json({ message: "Usuario o contraseña incorrecta" });
    }

    // Creamos el token
    const dataToken = {
      idUsuarios: rowsUser[0].idUsuarios,
      img: rowsUser[0].img,
      username,
      rol: rowsUser[0].rol,
    };

    const token = createAccessToken(dataToken);
    await pool.query(
      "INSERT INTO login (token, fecha, idUsuarios) VALUES (?,?,?)",
      [token, HoyfechaLocal, rowsUser[0].idUsuarios]
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Asegúrate de usar HTTPS en producción
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      path: "/",
    });
    res.status(201).json(dataToken);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en login",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true, 
      sameSite: "None", 
      expires: new Date(0), 
    });
    return res.status(200).json({ message: "Se cerro la sesion" });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en logout",
    });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await pool.query("SELECT * FROM usuarios");
    res.json(usuarios[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getUsuarios",
    });
  }
};

export const getIdUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM usuarios WHERE idUsuarios = ?";
    const user = await pool.query(query, [id]);

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getIdUsuarios",
    });
  }
};

export const updatePerfilUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const { img, nombre, apellido, email, telefono, password } = req.body;
    const updateHashedPassord = await bcrypt.hash(password, 10);
    // Capturamos la contraseñia del usuario
    const userFound = await pool.query(
      "SELECT * FROM usuarios WHERE idUsuarios = ?",
      [id]
    );

    let passwordFound = userFound[0][0].password;

    // Definimos el upadte del usuario
    const query = `
    UPDATE usuarios SET img = ?, nombre = ?, apellido = ?, email = ?, telefono = ?, password = ?
    WHERE idUsuarios = ?
    `;

    // Declaramos la varibale para gestionar los 2 ecenarios
    let values;

    if (password === passwordFound) {
      values = [img, nombre, apellido, email, telefono, password, id];
    } else {
      values = [
        img,
        nombre,
        apellido,
        email,
        telefono,
        updateHashedPassord,
        id,
      ];
    }

    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró el usuario a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM usuarios WHERE idUsuarios = ?",
      [id]
    );

    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updatePerfilUsuarios",
    });
  }
};

export const verfiyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.status(401).json({ message: "No autorizado" });
      const userFound = await pool.query(
        "SELECT * FROM usuarios WHERE username",
        [user.username]
      );
      if (!userFound) return res.status(401).json({ message: "No autorizado" });
      return res.json({
        idUsuarios: user.idUsuarios,
        img: user.img,
        username: user.username,
        rol: user.rol,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en verfiyToken",
    });
  }
};
