import React from "react";
import { useVentas } from "../../../context/VentasContext";
import { formatearNumero } from "../../../helpers/formatearNumero";

export const CardResumenVentas = () => {
  const { totalesGenerales, totalVentasHoyData,getVentas } = useVentas();
  const { totalVentasHoy, totalGanaciaHoy } = totalVentasHoyData;
  const { totalVentaGeneral, totalGanaciaGeneral } = totalesGenerales;

  return (
    <>
     
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total de ventas hoy
        </h5>
        <p className="text-xl font-bold text-sky-300">
          {" "}
          {totalVentasHoyData !== ""
            ? formatearNumero(totalVentasHoy)
            : formatearNumero(0)}
        </p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
          {" "}
          Este valor es dinamico
        </p>
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total de ganacias hoy
        </h5>
        <p className="text-xl font-bold text-green-300">
          {" "}
          {totalVentasHoyData !== ""
            ? formatearNumero(totalGanaciaHoy)
            : formatearNumero(0)}
        </p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
          {" "}
          Este valor es dinamico
        </p>
      </div>

      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Ventas Totales
        </h5>
        <p className="text-xl font-bold text-green-300">
          {totalesGenerales !== ""
            ? formatearNumero(totalVentaGeneral)
            : formatearNumero(0)}
        </p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
          {" "}
          Este valor es dinamico
        </p>
      </div>

      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Ganancias totales
        </h5>
        <p className="text-xl font-bold text-green-300">
          {totalesGenerales !== ""
            ? formatearNumero(totalGanaciaGeneral)
            : formatearNumero(0)}
        </p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
          {" "}
          Este valor es dinamico
        </p>
      </div>
    </>
  );
};
