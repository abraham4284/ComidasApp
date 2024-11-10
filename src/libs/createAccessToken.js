import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const createAccessToken = (data = {}) => {
  try {
    return jwt.sign(data, TOKEN_SECRET, { expiresIn: "2d" });
  } catch (error) {
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createAccessToken",
    });
  }
};
