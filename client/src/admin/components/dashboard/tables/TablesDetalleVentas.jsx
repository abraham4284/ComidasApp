import React from "react";
import { formatearNumero } from "../../../../helpers/formatearNumero";

export const TablesDetalleVentas = ({ data }) => {
  return (
    <table className="w-full m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-sm text-black uppercase border-2 ">
        <tr>
          <th scope="col" className="px-6 py-3">
            Img
          </th>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Cantidad
          </th>
          <th scope="col" className="px-6 py-3">
            Precio Costo
          </th>

          <th scope="col" className="px-6 py-3">
            Precio venta
          </th>

          <th scope="col" className="px-6 py-3">
            SubTotal-Costo
          </th>
          <th scope="col" className="px-6 py-3">
            SubTotal-Venta
          </th>
          <th scope="col" className="px-6 py-3">
            Ganacia
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((el) => {
            const ganancia =
              parseFloat(el.subTotalVenta) - parseFloat(el.subTotalCosto);
            return (
              <tr
                key={el.idDetalleVentas}
                className="bg-white dark:bg-gray-800"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    src={el.img}
                    alt={el.nombre}
                    className="w-14 h-14 rounded-3xl object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el.nombre}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el.cantidad}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatearNumero(el.precioCosto)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatearNumero(el.precioVenta)}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatearNumero(el.subTotalCosto)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatearNumero(el.subTotalVenta)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatearNumero(ganancia)}
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
