import React from "react";

export const CardFilterVentas = ( { onFechaInicio, onFechaFIn}) => {
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
        <h2 className="text-slate-700 mb-2 sm:mb-0 font-bold">
          Seleccione fechas
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 space-y-2 sm:space-y-0">
          <input
            type="date"
            className="block w-full p-2 pl-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={onFechaInicio}
          />
          <input
            type="date"
            className="block w-full p-2 pl-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={onFechaFIn}
         />
        </div>
      </div>
    </div>
  );
};
