import React, { useEffect, useState } from "react";
import { TableComprasDetalles } from "./TableComprasDetalles";
import { formatearNumero } from "../../../../helpers/formatearNumero";
import { useVentas } from "../../../../context/VentasContext";
import { useAuth } from "../../../../context/AuthContext";
import { descargarTicket } from "../../../../admin/helpers/DescargarTicket";
import { descargarComanda } from "../../../../admin/helpers/DescargarComanda";

export const CardComprasDetalle = ({ ventas, detalleVentas, negocios }) => {
  const {
    idVentas,
    Npedido,
    fecha,
    hora,
    estado,
    totalVenta,
    descripcion,
    idDomicilios,
    calle,
    numero,
    descripcionDomicilio,
    apellido,
    nombre,
  } = ventas.length > 0 ? ventas[0] : {};

  const { nombre: nombreNegocio } = negocios.length > 0 ? negocios[0] : {};

  const {
    handleBeforePrint,
    handleAfterPrint,
    onClickPrint,
    mostrarParaImprimir,
    loading,
    loadingDetalles,
  } = useVentas();
  const { usuarios } = useAuth();
  const domicilio =
    idDomicilios === null
      ? "Retiro en tienda"
      : `${calle}-${numero}-${descripcionDomicilio}`;

  useEffect(() => {
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        {usuarios.rol === "admin" ? (
          mostrarParaImprimir ? (
            ""
          ) : (
            <div className="flex justify-end mb-3 gap-3">
              <button
                className="font-medium flex gap-1 text-blue-600 dark:text-blue-500 hover:underline lg:mr-2"
                onClick={async()=> await descargarComanda(idVentas,Npedido)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Descargar comanda
              </button>

              <button
                className="font-medium flex gap-1 text-blue-600 dark:text-blue-500 hover:underline lg:mr-2"
                onClick={async ()=> await descargarTicket(idVentas, Npedido)}
              >
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="size-6"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d="M366.05 146a46.7 46.7 0 01-2.42-63.42 3.87 3.87 0 00-.22-5.26l-44.13-44.18a3.89 3.89 0 00-5.5 0l-70.34 70.34a23.62 23.62 0 00-5.71 9.24h0a23.66 23.66 0 01-14.95 15h0a23.7 23.7 0 00-9.25 5.71L33.14 313.78a3.89 3.89 0 000 5.5l44.13 44.13a3.87 3.87 0 005.26.22 46.69 46.69 0 0165.84 65.84 3.87 3.87 0 00.22 5.26l44.13 44.13a3.89 3.89 0 005.5 0l180.4-180.39a23.7 23.7 0 005.71-9.25h0a23.66 23.66 0 0114.95-15h0a23.62 23.62 0 009.24-5.71l70.34-70.34a3.89 3.89 0 000-5.5l-44.13-44.13a3.87 3.87 0 00-5.26-.22 46.7 46.7 0 01-63.42-2.32z"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d="M250.5 140.44l-16.51-16.51M294.52 184.46l-11.01-11M338.54 228.49l-11-11.01M388.07 278.01l-16.51-16.51"
                  />
                </svg>
                Descargar pedido
              </button>
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={onClickPrint}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                  />
                </svg>
              </button>
            </div>
          )
        ) : (
          ""
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            N Orden {loading ? "#Cargando..." : `#${Npedido}`}
          </h2>

          <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
            <h4 className="text-lg font-semibold text-gray-900 ">
              { nombreNegocio }
            </h4>

            <dl>
              <dt className="text-base font-medium text-gray-900 ">
                Apellido y nombre:{" "}
                {loading ? "Cargando..." : `${apellido} ${nombre}`}
              </dt>
              <dt className="text-base font-medium text-gray-900 ">
                Fecha y hora: {loading ? "Cargando..-" : `${fecha} ${hora}`}
              </dt>
              <dt className="text-base font-medium text-gray-900 ">
                Estado: {loading ? "Cargando..." : estado}
              </dt>
              <dt className="text-base font-medium text-gray-900 ">
                Envio: {loading ? "Cargando..." : domicilio}
              </dt>
              <dd className="mt-1 text-base font-normal text-slate-700 ">
                {loading ? "Cargando..." : descripcion}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-5">
        <TableComprasDetalles
          data={detalleVentas}
          loadingDetalles={loadingDetalles}
        />
      </div>

      <div className="flex justify-end">
        <div className="flex flex-col mt-5 gap-2">
          <div className="flex justify-end gap-5">
            <dt className="text-lg font-bold text-gray-900 ">SubTotal</dt>
            <dd className="text-lg font-bold text-gray-900 ">
              {formatearNumero(totalVenta)}
            </dd>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex justify-end gap-5">
            <dt className="text-lg font-bold text-gray-900 ">Total</dt>
            <dd className="text-lg font-bold text-gray-900 ">
              {formatearNumero(totalVenta)}
            </dd>
          </div>
        </div>
      </div>
    </>
  );
};
