import { descargarComandaRequest } from "../../api/tickets/tickets";

export const descargarComanda = async (id, NPedido) => {
  try {
    const { data } = await descargarComandaRequest(id);
    if (!data) console.error("La data no existe", data);

    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Comanda_${NPedido}.pdf`);
    document.body.appendChild(link);

    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error({
      error: error.message,
      errorCompleto: error,
      message: "Error en descargarTicket",
    });
  }
};
