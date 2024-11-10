import React, { useEffect } from 'react'
import { useVentas } from '../../../context/VentasContext';
import { useParams } from 'react-router-dom';
import { DetallesVentas } from '../../components/dashboard/DetallesVentas';
import { useNegocios } from '../../../context/NegociosContext';

export const DetalleVentasPage = () => {
    const { id } = useParams();
  const { detalleVentas, loading, getIdDetalleVentas, getIdVentas, ventas } =
    useVentas();
  const { getNegociosByUsuario, negocios  } = useNegocios();

  useEffect(() => {
    getIdDetalleVentas(id);
    getIdVentas(id);
    getNegociosByUsuario()
  }, [id]);

  return (
    <div className="w-full">
      <div className="grid gap-5 p-6 lg:grid-cols-1 sm:grid-cols-1">
        <DetallesVentas detalleVentas={detalleVentas} ventas={ventas} negocios = {negocios} />
      </div>
    </div>
  )
}
