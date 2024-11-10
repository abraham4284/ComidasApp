import { pool } from "../../db.js";
import { calcularTotalCarrito } from "../../helpers/CalcularTotal.js";
import { fechaLocal } from "../../helpers/formatearFecha.js";
import { GenerarNumeroPedido } from "../../helpers/GenerarNumeroPedido.js";
import {
  modificarStockPorVentaAnulada,
  modificarStockVenta,
} from "../../helpers/modificarStock.js";

export const getVentas = async (req, res) => {
  try {
    const query = `
    SELECT v.idVentas, v.idDomicilios, v.fecha, v.hora, v.Npedido, v.estado, v.totalCosto, v.totalVenta, v.descripcion, v.idUsuarios, v.idformaPago, u.apellido, u.nombre,
    d.calle, d.numero, d.descripcion
    FROM ventas v
    LEFT JOIN  usuarios u ON u.idUsuarios = v.idUsuarios
    LEFT JOIN domicilios d ON d.idDomicilios = v.idDomicilios
    `
    const ventas = await pool.query(query);
    res.json(ventas[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getVentas",
    });
  }
};

export const getVentasByUsuarios = async (req, res) => {
  try {
    const { idUsuarios } = req.user;
    console.log(idUsuarios,'Soy el idUsuarios')
    const query = "SELECT * FROM ventas WHERE idUsuarios = ?";
    const [rows] = await pool.query(query, [idUsuarios]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getVentas",
    });
  }
};

export const getIdVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
    SELECT v.idVentas, v.idDomicilios, v.fecha, v.hora, v.Npedido, v.estado, v.totalCosto, v.totalVenta, v.descripcion, v.idUsuarios, v.idformaPago, u.apellido, u.nombre,
    d.calle, d.numero, d.descripcion AS descripcionDomicilio
    FROM ventas v
    LEFT JOIN  usuarios u ON u.idUsuarios = v.idUsuarios
    LEFT JOIN domicilios d ON d.idDomicilios = v.idDomicilios
    WHERE v.idVentas = ?
    `
    const ventas = await pool.query(query, [
      id,
    ]);
    res.json(ventas[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getVentas",
    });
  }
};

export const getDetalleVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
       SELECT dv.idDetalleVentas, dv.precioCosto, dv.precioVenta, dv.cantidad, dv.subTotalCosto, dv.subTotalVenta,
       dv.idVentas, dv.idUsuarios, dv.idProductos, p.nombre, p.img FROM detalle_venta dv
       JOIN productos p ON p.idProductos = dv.idProductos
       WHERE dv.idVentas = ?;
       `;
    const detalleVentas = await pool.query(query, [id]);
    res.json(detalleVentas[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getDetalleVentas",
    });
  }
};

export const getVentasEstadoPendiente = async (req, res) => {
  try {
    const ventasPendientes = await pool.query(
      `SELECT * FROM ventas WHERE estado = "Pendiente"`
    );
    res.json(ventasPendientes);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getVentasEstadoPendiente",
    });
  }
};

export const createVentas = async (req, res) => {
  try {
    const { carrito, idUsuarios, idDomicilios, idformaPago, descripcion } =
      req.body;

    const { totalPrecioCosto, totalPrecioVenta } =
      calcularTotalCarrito(carrito);
    const Npedido = GenerarNumeroPedido();
    const { HoyfechaLocal } = fechaLocal();
    const hora = new Date().toLocaleTimeString("en-US", { hour12: false });
    const estado = "Pendiente";

    const query = `
    INSERT INTO ventas (fecha,hora, Npedido, estado, totalCosto,TotalVenta, descripcion,idUsuarios,idformapago,idDomicilios)
    VALUES(?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      HoyfechaLocal,
      hora,
      Npedido,
      estado,
      totalPrecioCosto,
      totalPrecioVenta,
      descripcion,
      idUsuarios,
      idformaPago,
      idDomicilios,
    ];

    const [resultVentas] = await pool.query(query, values);

    const idVentas = resultVentas.insertId;

    const ventas = carrito.map(async (venta) => {
      const { idProductos, precioCosto, precioVenta, cantidad } = venta;
      const subTotalCosto = precioCosto * cantidad;
      const subTotalVenta = precioVenta * cantidad;
      const values = [
        precioCosto,
        precioVenta,
        cantidad,
        subTotalCosto,
        subTotalVenta,
        idVentas,
        idUsuarios,
        idProductos,
      ];

      const query = `
       INSERT INTO detalle_venta (precioCosto, precioVenta, cantidad, subTotalCosto, subTotalVenta, idVentas, idUsuarios, idProductos)
       VALUES(?,?,?,?,?,?,?,?)
       `;
      await pool.query(query, values);
    });

    await Promise.all(ventas);

    //Dar de bajo el stock
    await Promise.all(
      carrito.map((el) => modificarStockVenta(el.idProductos, el.cantidad))
    );

    res.status(201).json({
      message: "Venta Registrada",
      idVentas,
      Npedido,
    });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createVentas",
    });
  }
};

export const updateEstadoVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ error: "El estado no puede venir vacio" });
    }
    const query = "UPDATE ventas SET estado = ? WHERE idVentas = ?";
    const [rows] = await pool.query(query, [estado, id]);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro la venta actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM ventas WHERE idVentas = ?",
      [id]
    );

    if (estado === "Anulado") {
      const detalleVenta = await pool.query(
        "SELECT * FROM detalle_venta WHERE idVentas = ?",
        [id]
      );

      await detalleVenta[0].map((el) =>
        modificarStockPorVentaAnulada(estado, el.idProductos, el.cantidad)
      );
      console.log("Stock dado de alto debido a anulacion de venta");
    }

    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateEstadoVentas",
    });
  }
};
