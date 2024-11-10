import React from "react";
import { useVentas } from "../../../../context/VentasContext";
import { formatearNumero } from "../../../../helpers/formatearNumero";

// flex flex-col sm:flex-row gap-2 sm:space-x-2 space-y-2 sm:space-y-0
export const CardResumeFilter = () => {
  const { totalFechasPorRango, totalPorFecha } = useVentas();
  const { totalVentaPorRango, totalGanaciasPorRango } = totalFechasPorRango;
  const { totalVentaPorDia, totalGanaciasPorDia } = totalPorFecha;


  return (
    <div className="grid mt-10 lg:grid-cols-1">
      <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-10">
        <div className="grid lg:grid-cols-12 sm:grid-cols-1 gap-2">
          <div className="block lg:col-span-3 sm:col-span-12 max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total por dia
            </h5>
            <p className="text-xl font-bold text-sky-300">
              {totalPorFecha !== ""
                ? formatearNumero(totalVentaPorDia)
                : formatearNumero(0)}
            </p>
          </div>
          <div className="block lg:col-span-3 sm:col-span-12 max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ganancia por dia
            </h5>
            <p className="text-xl font-bold text-sky-300">
              {totalPorFecha !== ""
                ? formatearNumero(totalGanaciasPorDia)
                : formatearNumero(0)}
            </p>
          </div>
          <div className="block lg:col-span-3 sm:col-span-12 max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total por rango
            </h5>
            <p className="text-xl font-bold text-sky-300">
              {totalFechasPorRango !== ""
                ? formatearNumero(totalVentaPorRango)
                : formatearNumero(0)}
            </p>
          </div>

          <div className="block lg:col-span-3 sm:col-span-12 max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ganacia por rango
            </h5>
            <p className="text-xl font-bold text-sky-300">
              {totalFechasPorRango !== ""
                ? formatearNumero(totalGanaciasPorRango)
                : formatearNumero(0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
