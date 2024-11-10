import React, { useEffect, useState } from "react";
import { CardResumenVentas } from "./CardResumenVentas";
import { FIlterVentas } from "./FIlterVentas";
import { useVentas } from "../../../context/VentasContext";
import { CardPanel } from "./cards/CardPanel";

export const SectionDashboard = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [inputNPedido, setInputNPedido] = useState("");
  const [deteccionCambio, setDeteccionCambio] = useState(false);

  const {
    getVentas,
    ventas,
    sumarTotalesPorRangoFechas,
    sumarTotalesPorFecha,
    sumarTotalesGenerales,
    sumarTotalesHoy,
    handleResetTotales,
    filtroVentasPorRango,
  } = useVentas();

  const onFechaInicio = (e) => {
    setFechaInicio(e.target.value);
  };
  const onFechaFIn = (e) => {
    setFechaFin(e.target.value);
  };

  const onInputNPedido = (e) => {
    setInputNPedido(e.target.value);
  };

  const handleReset = () => {
    setFechaInicio("");
    setFechaFin("");
    handleResetTotales();
  };

  useEffect(() => {
    getVentas();
    if (ventas.length > 0) {
      sumarTotalesGenerales(ventas);
      sumarTotalesHoy(ventas);
    }
  }, []);

  useEffect(() => {
    getVentas();
    if (ventas.length > 0) {
      sumarTotalesGenerales(ventas);
      sumarTotalesHoy(ventas);
    }
  }, [deteccionCambio]);

  useEffect(() => {
    if (ventas.length > 0 && fechaInicio) {
      sumarTotalesPorFecha(ventas, fechaInicio);
    }
    if (ventas.length > 0 && fechaInicio && fechaFin) {
      sumarTotalesPorRangoFechas(ventas, fechaInicio, fechaFin);
    }
  }, [fechaInicio, fechaFin]);

  const ventasDef =
    filtroVentasPorRango.length > 0 ? filtroVentasPorRango : ventas;

  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-1 gap-2 sm:grid-cols-1">
        <CardPanel setDeteccionCambio={setDeteccionCambio} />
      </div>
      <div className="grid lg:grid-cols-4 gap-2 sm:grid-cols-1">
        <CardResumenVentas />
      </div>

      <div className="grid mt-20 lg:grid-cols-1">
        <FIlterVentas
          data={ventasDef}
          onFechaInicio={onFechaInicio}
          onFechaFIn={onFechaFIn}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          inputNPedido={inputNPedido}
          onInputNPedido={onInputNPedido}
          handleReset={handleReset}
        />
      </div>
    </section>
  );
};
