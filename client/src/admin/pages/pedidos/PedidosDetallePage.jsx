import React, { useEffect } from "react";
import { useVentas } from "../../../context/VentasContext";
import { useParams } from "react-router-dom";
import { ComprasDetallePage } from "../../../Home/pages/perfil/ComprasDetallePage";

export const PedidosDetallePage = () => {
  const { id } = useParams();
  const { detalleVentas, loading, getIdDetalleVentas, getIdVentas, ventas } =
    useVentas();

  useEffect(() => {
    getIdDetalleVentas(id);
    getIdVentas(id);
  }, []);
  return (
    <div className="w-full">
      <div className="grid gap-5 p-6 lg:grid-cols-1 sm:grid-cols-1">
        <ComprasDetallePage detalleVentas={detalleVentas} ventas={ventas} />
      </div>
    </div>
  );
};
