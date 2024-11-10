import React from "react";

export const NegocioCerrado = () => {
  return (
    <div className="w-full flex justify-center mt-40 p-2">
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Negocio cerrado
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Horario de atencion 11:00 AM hasta 14:00 PM y 20:00 a 00:00
        </p>
        
      </div>
    </div>
  );
};
