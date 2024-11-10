import React from "react";
import { TablesDetalleVentas } from "./tables/TablesDetalleVentas";
import { formatearNumero } from "../../../helpers/formatearNumero";

export const DetallesVentas = ( { ventas, detalleVentas, negocios }) => {
    const { Npedido, fecha, hora, estado,totalCosto, totalVenta, descripcion } =
    ventas.length > 0 ? ventas[0] : {};

    const { nombre } = negocios.length > 0 ? negocios[0] : {}
    const ganacia = totalVenta - totalCosto;

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <div>
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            N Orden #{Npedido}
          </h2>

          <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
            <h4 className="text-lg font-semibold text-gray-900 ">
              { nombre }
            </h4>

            <dl>
              <dt className="text-base font-medium text-gray-900 ">
                Fecha y hora: {fecha} {hora}
              </dt>
              <dt className="text-base font-medium text-gray-900 ">
                Estado: {estado}
              </dt>
              <dd className="mt-1 text-base font-normal text-slate-700 ">
                {descripcion}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-5">
        <TablesDetalleVentas data={detalleVentas} />
      </div>

      <div className="flex justify-end">
        <div className="flex flex-col mt-5 gap-2">
          <div className="flex justify-end gap-5">
            <dt className="text-lg font-bold text-gray-900 ">Total-costo</dt>
            <dd className="text-lg font-bold text-gray-900 ">
              {formatearNumero(totalCosto)}
            </dd>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex justify-end gap-5">
            <dt className="text-lg font-bold text-gray-900 ">Total-venta</dt>
            <dd className="text-lg font-bold text-gray-900 ">
              {formatearNumero(totalVenta)}
            </dd>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex justify-end gap-5">
            <dt className="text-lg font-bold text-gray-900 ">Ganacia</dt>
            <dd className="text-lg font-bold text-gray-900 ">
              {formatearNumero(ganacia)}
            </dd>
          </div>
        </div>
      </div>
      
    </>
  );
};
