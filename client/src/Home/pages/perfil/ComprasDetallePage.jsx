import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVentas } from "../../../context/VentasContext";
import { CardComprasDetalle } from "../../components/perfil/compras/CardComprasDetalle";
import { useNegocios } from "../../../context/NegociosContext";

export const ComprasDetallePage = () => {
  const { id } = useParams();
  const {
    detalleVentas,
    getIdDetalleVentas,
    getIdVentas,
    ventas,
    handleResetVentas,
    handleResetDetalleVentas,
    setLoading,
    setLoadingDetalles,
  } = useVentas();

  const { getNegociosByUsuario, negocios } = useNegocios();

  const getFetchVentas = async (id) => {
    setLoading(true);
    setLoadingDetalles(true);

    handleResetVentas();
    handleResetDetalleVentas();

    await getIdDetalleVentas(id);
    await getIdVentas(id);
  };

  const resetGetUseEffect = () => {
    handleResetVentas();
    handleResetDetalleVentas();
  };


  useEffect(() => {
    getFetchVentas(id);
    return () => {
      resetGetUseEffect();
    };
  }, [id]);

  useEffect(()=>{
    getNegociosByUsuario();
  },[id])


  


  return (
    <div className="w-full">
      <div className="grid gap-5 p-6 lg:grid-cols-1 sm:grid-cols-1">
        <CardComprasDetalle ventas={ventas} detalleVentas={detalleVentas} negocios = {negocios}/>
      </div>
    </div>
  );
};
