import React from "react";
import { TableVentasDashboard } from "./TableVentasDashboard";
import { CardResumeFilter } from "./cards/CardResumeFilter";

export const FIlterVentas = ({
  data,
  onFechaInicio,
  onFechaFIn,
  fechaInicio,
  fechaFin,
  inputNPedido,
  onInputNPedido,
  handleReset,
}) => {
  return (
    <>
      <CardResumeFilter />
      <TableVentasDashboard
        data={data}
        onFechaInicio={onFechaInicio}
        onFechaFIn={onFechaFIn}
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        inputNPedido={inputNPedido}
        onInputNPedido={onInputNPedido}
        handleReset={handleReset}
      />
    </>
  );
};
