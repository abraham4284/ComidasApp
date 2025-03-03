import React from "react";
import { Link } from "react-router-dom";
import { formatearNumero } from "../../../../helpers/formatearNumero";
import { Spiner } from "../../../../components/Spiner";

export const TableCompras = ({ data, loading }) => {
  return (
    <table className="w-full m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-sm text-black uppercase border-2 ">
        <tr>
          <th scope="col" className="px-6 py-3">
            Fecha
          </th>
          <th scope="col" className="px-6 py-3">
            Hora
          </th>
          <th scope="col" className="px-6 py-3">
            NPedido
          </th>
          <th scope="col" className="px-6 py-3">
            Estado
          </th>

          <th scope="col" className="px-6 py-3">
            Total
          </th>
          <th scope="col" className="px-6 py-3">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr className="bg-white dark:bg-gray-800">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {" "}
              <Spiner />{" "}
            </td>
          </tr>
        ) : data.length > 0 ? (
          data.map((el) => {
            return (
              <tr key={el.idVentas} className="bg-gray-800">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {el.fecha}
                </td>
                <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                  {el.hora}
                </td>
                <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                  {el.Npedido}
                </td>
                <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
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
                </td>
                <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                  {formatearNumero(el.totalVenta)}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    to={`/compras/${el.idVentas}`}
                  >
                    Ver compra
                  </Link>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="bg-white dark:bg-gray-800">
            <td
              colSpan="6"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              No se encontraron compras para esta fecha
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
