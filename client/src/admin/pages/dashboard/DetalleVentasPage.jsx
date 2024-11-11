import React, { useEffect } from "react";
import { useVentas } from "../../../context/VentasContext";
import { useParams } from "react-router-dom";
import { DetallesVentas } from "../../components/dashboard/DetallesVentas";
import { useNegocios } from "../../../context/NegociosContext";
import { Spiner } from "../../../components/Spiner";

export const DetalleVentasPage = () => {
  const { id } = useParams();
  const {
    detalleVentas,
    loading,
    getIdDetalleVentas,
    getIdVentas,
    ventas,
    loadingDetalles,
    setLoadingDetalles,
    handleResetDetalleVentas,
  } = useVentas();
  const { getNegociosByUsuario, negocios } = useNegocios();

  const getFechVentas = async (id) => {
    setLoadingDetalles(true);
    handleResetDetalleVentas();
    await getIdVentas(id);
    await getIdDetalleVentas(id);
    await getNegociosByUsuario();
    setLoadingDetalles(false);
  };

  useEffect(() => {
    getFechVentas(id);
  }, [id]);



  return (
    <div className="w-full">
      <div className="grid gap-5 p-6 lg:grid-cols-1 sm:grid-cols-1">
        {loadingDetalles ? (
          <div className="flex justify-center min-h-screen items-center">
            <Spiner />
          </div>
        ) : (
          <DetallesVentas
            detalleVentas={detalleVentas}
            ventas={ventas}
            negocios={negocios}
          />
        )}
      </div>
    </div>
  );
};
