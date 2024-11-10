import React from "react";
import { Link } from "react-router-dom";
import { formatearNumero } from "../../../helpers/formatearNumero";
import { descargarTicket } from "../../helpers/DescargarTicket";

export const TablePedidos = ({ data, updateEstadoVentas }) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {data.length > 0
        ? data.map((el) => (
            <div
              key={el.idVentas}
              className="flex flex-wrap items-center gap-y-4 py-6"
            >
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  NPedido:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  <a href="#" className="hover:underline">
                    {el.Npedido}
                  </a>
                </dd>
              </dl>
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Fecha:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  <a href="#" className="hover:underline">
                    {el.fecha}
                  </a>
                </dd>
              </dl>
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Hora:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  <a href="#" className="hover:underline">
                    {el.hora}
                  </a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Estado:
                </dt>
                {el.estado === "Pendiente" && (
                  <dd className="mt-1.5 text-base font-semibold text-white dark:text-white">
                    <span className="bg-yellow-100 text-yellow-400 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-30">
                      {el.estado}
                    </span>
                  </dd>
                )}

                {el.estado === "Completado" && (
                  <dd className="mt-1.5 text-base font-semibold text-white dark:text-white">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      {el.estado}
                    </span>
                  </dd>
                )}

                {el.estado === "Anulado" && (
                  <dd className="mt-1.5 text-base font-semibold text-white dark:text-white">
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      {el.estado}
                    </span>
                  </dd>
                )}
              </dl>
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Total:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  <a href="#" className="hover:underline">
                    {formatearNumero(el.totalVenta)}
                  </a>
                </dd>
              </dl>

              <div className="w-full lg:ml-5 grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                <Link
                  to={`/admin/pedidos/ventas/${el.idVentas}`}
                  className=" w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-sky-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-sky-100 dark:border-sky-600 dark:bg-sky-800 dark:text-sky-400 dark:hover:bg-sky-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                >
                  Ver
                </Link>
                {el.estado === "Pendiente" ? (
                  <button
                    type="button"
                    className="w-full  flex justify-center rounded-lg border border-green-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-sky-900 lg:w-auto"
                    title="Completar venta"
                    onClick={() =>
                      updateEstadoVentas(el.idVentas, "Completado", "Pendiente")
                    }
                    hidden={el.estado === "Anulado" && true}
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="size-6"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full rounded-lg border border-yellow-500 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-green-500 dark:text-yellow-500 dark:hover:bg-yellow-500 dark:hover:text-white dark:focus:ring-yellow-500 lg:w-auto"
                    onClick={() =>
                      updateEstadoVentas(el.idVentas, "Pendiente", "Completado")
                    }
                    hidden={el.estado === "Anulado" && true}
                  >
                    Volver a pendiente
                  </button>
                )}

                <button
                  type="button"
                  className="w-full flex justify-center rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                  title="Anular venta"
                  onClick={() =>
                    updateEstadoVentas(el.idVentas, "Anulado", "Anular")
                  }
                  hidden={
                    el.estado === "Anulado" ||
                    (el.estado === "Completado" && true)
                  }
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
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="w-full flex justify-center rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto "
                  title="Descargar pedido"
                  onClick={async () =>
                    await descargarTicket(el.idVentas, el.Npedido)
                  }
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    className="size-6"
                  >
                    <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM633.22 637.26c-15.18-.5-31.32.67-49.65 2.96-24.3-14.99-40.66-35.58-52.28-65.83l1.07-4.38 1.24-5.18c4.3-18.13 6.61-31.36 7.3-44.7.52-10.07-.04-19.36-1.83-27.97-3.3-18.59-16.45-29.46-33.02-30.13-15.45-.63-29.65 8-33.28 21.37-5.91 21.62-2.45 50.07 10.08 98.59-15.96 38.05-37.05 82.66-51.2 107.54-18.89 9.74-33.6 18.6-45.96 28.42-16.3 12.97-26.48 26.3-29.28 40.3-1.36 6.49.69 14.97 5.36 21.92 5.3 7.88 13.28 13 22.85 13.74 24.15 1.87 53.83-23.03 86.6-79.26 3.29-1.1 6.77-2.26 11.02-3.7l11.9-4.02c7.53-2.54 12.99-4.36 18.39-6.11 23.4-7.62 41.1-12.43 57.2-15.17 27.98 14.98 60.32 24.8 82.1 24.8 17.98 0 30.13-9.32 34.52-23.99 3.85-12.88.8-27.82-7.48-36.08-8.56-8.41-24.3-12.43-45.65-13.12zM385.23 765.68v-.36l.13-.34a54.86 54.86 0 015.6-10.76c4.28-6.58 10.17-13.5 17.47-20.87 3.92-3.95 8-7.8 12.79-12.12 1.07-.96 7.91-7.05 9.19-8.25l11.17-10.4-8.12 12.93c-12.32 19.64-23.46 33.78-33 43-3.51 3.4-6.6 5.9-9.1 7.51a16.43 16.43 0 01-2.61 1.42c-.41.17-.77.27-1.13.3a2.2 2.2 0 01-1.12-.15 2.07 2.07 0 01-1.27-1.91zM511.17 547.4l-2.26 4-1.4-4.38c-3.1-9.83-5.38-24.64-6.01-38-.72-15.2.49-24.32 5.29-24.32 6.74 0 9.83 10.8 10.07 27.05.22 14.28-2.03 29.14-5.7 35.65zm-5.81 58.46l1.53-4.05 2.09 3.8c11.69 21.24 26.86 38.96 43.54 51.31l3.6 2.66-4.39.9c-16.33 3.38-31.54 8.46-52.34 16.85 2.17-.88-21.62 8.86-27.64 11.17l-5.25 2.01 2.8-4.88c12.35-21.5 23.76-47.32 36.05-79.77zm157.62 76.26c-7.86 3.1-24.78.33-54.57-12.39l-7.56-3.22 8.2-.6c23.3-1.73 39.8-.45 49.42 3.07 4.1 1.5 6.83 3.39 8.04 5.55a4.64 4.64 0 01-1.36 6.31 6.7 6.7 0 01-2.17 1.28z" />
                  </svg>
                </button>

               
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};
