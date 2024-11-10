import PDF from "pdfkit-construct";
import { pool } from "../../db.js";
import { formatearTotal } from "../../helpers/formatearTotal.js";
import { formatearFechas } from "../../helpers/formatearFecha.js";

export const generarTicketVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const queryVentas = `
     SELECT v.idVentas, v.idDomicilios, v.fecha, v.hora, v.Npedido, v.estado, v.totalCosto, v.totalVenta, v.descripcion, v.idUsuarios, v.idformaPago, u.apellido, u.nombre, u.telefono,
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

    const queryNegocios = "SELECT * FROM negocios";

    const [ventas] = await pool.query(queryVentas, [id]);
    const [detalleVentas] = await pool.query(queryDetalleVentas, [id]);
    const [ negocios ] = await pool.query(queryNegocios)

    const {
      Npedido,
      fecha,
      hora,
      estado,
      totalVenta,
      descripcion,
      apellido,
      nombre,
      calle,
      numero,
      descripcionDomicilio,
      idDomicilios,
      telefono
    } = ventas.length > 0 ? ventas[0] : {};

    // const fechaFormateada = formatearFechas(fecha);

    const { nombre: nombreNegocio } = negocios.length > 0 ? negocios[0] : {}  

    const domicilio =
      idDomicilios === null
        ? "Retiro en tienda"
        : `${calle}-${numero}-${descripcionDomicilio}`;

    const detalleData = detalleVentas.map((el) => ({
      nombre: el.nombre,
      precioVenta: el.precioVenta,
      cantidad: parseInt(el.cantidad),
      subTotalVenta: parseFloat(el.subTotalVenta),
    }));

    const doc = new PDF({
      bufferPages: true,
      size: [250, 700], // Aumenta el tamaño para más espacio
      margins: { top: 20, bottom: 10, left: 10, right: 10 }, // Márgenes ajustados
    });

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${Npedido}.pdf"`,
    });

    doc.pipe(res);

    doc.setDocumentHeader(
      { height: "15%" }, // Aumenta el tamaño del encabezado para más espacio
      () => {
        doc.fontSize(12).text(`${nombreNegocio}`, { width: 230, align: "center" });
        doc.moveDown(0.3);
        doc.fontSize(9);

        doc.text(`Nº: ${Npedido}`, { width: 230, align: "left" });
        doc.moveDown(0.3);
        doc.text(`Fecha y hora: ${fecha} ${hora}`, {
          width: 230,
          align: "left",
        });
        doc.moveDown(0.3);
        doc.text(`Cliente y telefono: ${apellido} ${nombre}-${telefono}`, {
          width: 230,
          align: "left",
        });
        doc.moveDown(0.3);
        doc.text(`Envio: ${domicilio}`, { width: 230, align: "left" });
        doc.moveDown(0.3);
        doc.text(`Total: ${formatearTotal(totalVenta)}`, { width: 230, align: "left" });
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
        marginTop: 15, // Añade espacio entre el encabezado y la tabla
      }
    );

    doc.setDocumentFooter({ height: "10%" }, () => {
      doc
        .fontSize(8)
        .text("Muchas gracias por su compra", 0, doc.page.height - 60, {
          align: "center",
        });
      doc
        .fontSize(7)
        .text(
          "</> AbrahamTech | Soluciones Tecnologicas",
          0,
          doc.page.height - 40,
          { align: "center" }
        );
    });

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
