import React, { useEffect } from "react";
import { useNegocios } from "../../../context/NegociosContext";
import { Outlet } from "react-router-dom";
import { NegocioCerrado } from "../NegocioCerrado";

export const ProtectedEstadoNegocio = () => {
  const { negocios, getNegociosByUsuario } = useNegocios();

  const { estado } = negocios.length > 0 ? negocios[0] : {};

  useEffect(() => {
    // Polling cada 5 segundos para revisar el estado del negocio
    const intervalId = setInterval(() => {
      getNegociosByUsuario(); // Llamada a la API para verificar el estado actual del negocio
    }, 5000); // Consulta cada 5 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [getNegociosByUsuario]);

  return <>{estado === "Cerrado" ? <NegocioCerrado /> : <Outlet />}</>;
};
