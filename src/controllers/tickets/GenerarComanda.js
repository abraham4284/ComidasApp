import PDF from "pdfkit-construct";
import { pool } from "../../db.js";
import { formatearTotal } from "../../helpers/formatearTotal.js";
import { formatearFechas } from "../../helpers/formatearFecha.js";

export const generarComada = async (req, res) => {
  try {
    const { id } = req.params;

    const queryVentas = `
     SELECT v.idVentas, v.idDomicilios, v.fecha, v.hora, v.Npedido, v.estado, v.totalCosto, v.totalVenta, v.descripcion, v.idUsuarios, v.idformaPago, u.apellido, u.nombre,
     d.calle, d.numero, d.descripcion AS descripcionDomicilio
     FROM ventas v
     LEFT JOIN  usuarios u ON u.idUsuarios = v.idUsuarios
     LEFT JOIN domicilios d ON d.idDomicilios = v.idDomicilios
     WHERE v.idVentas = ?
    `;

    const queryDetalleVentas = `
      SELECT dv.idVentas, dv.idDetalleVentas, p.nombre, dv.cantidad, dv.precioVenta, dv.subTotalVenta
      FROM detalle_venta dv
      JOIN productos p ON p.idProductos = dv.idProductos
      WHERE dv.idVentas = ?;
    `;

    const [ventas] = await pool.query(queryVentas, [id]);
    const [detalleVentas] = await pool.query(queryDetalleVentas, [id]);

    const {
      Npedido,
      fecha,
      hora,
      estado,
      totalVenta,
      descripcion,
      apellido,
      nombre,
    } = ventas.length > 0 ? ventas[0] : {};

    // const fechaFormateada = formatearFechas(fecha);

    const detalleData = detalleVentas.map((el) => ({
      nombre: el.nombre,
      precioVenta: el.precioVenta,
      cantidad: parseInt(el.cantidad),
      subTotalVenta: parseFloat(el.subTotalVenta),
    }));

    const doc = new PDF({
      bufferPages: true,
      size: [226, 600], // Tamaño para papel de 80mm de ancho, altura ajustable
      margins: { top: 10, bottom: 10, left: 10, right: 10 }, // Márgenes pequeños
    });

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${Npedido}.pdf"`,
    });

    doc.pipe(res);

    doc.setDocumentHeader(
      { height: "15%" }, // Aumenta el tamaño del encabezado para más espacio
      () => {
        doc.fontSize(12).text("Comandas", { width: 206, align: "center" });
        doc.moveDown(0.3);
        doc.fontSize(9);

        doc.text(`Nº: ${Npedido}`, { width: 206, align: "left" });
        doc.moveDown(0.3);
        doc.text(`Fecha y hora: ${fecha} ${hora}`, {
          width: 206,
          align: "left",
        });
        doc.moveDown(0.3);
        doc.text(`Cliente: ${apellido} ${nombre}`, {
          width: 206,
          align: "left",
        });
        doc.moveDown(0.3);
        doc.text(`Pedido: ${descripcion}`, { width: 206, align: "left" });
      }
    );

    doc.addTable(
      [
        { key: "nombre", label: "Prod", align: "left" },
        { key: "precioVenta", label: "P/U", align: "left", width: 50 },
        { key: "cantidad", label: "Cant", align: "left" },
        { key: "subTotalVenta", label: "SubTotal", align: "right" },
      ],
      detalleData,
      {
        border: null,
        width: "fill_body",
        striped: true,
        cellsPadding: 2,
        marginLeft: 1,
        marginRight: 1,
        headAlign: "center",
        headFont: "Helvetica-Bold",
        headFontSize: 6,
        bodyFontSize: 5,
      }
    );

    doc.setDocumentFooter(
      {
        height: "10%",
      },
      () => {
        doc.text(
          "</> AbrahamTech | Soluciones Tecnologicas",
          0,
          doc.page.height - 380,
          {
            align: "center",
            marginTop: 5,
          }
        );
      }
    );

    doc.render();
    doc.end();
  } catch (error) {
    console.error({
      error: error.message,
      errorCompleto: error,
      message: "Error en generarTicketVenta",
    });
  }
};
