import React from "react";
import { formatearNumero } from "../../../../helpers/formatearNumero";
import { Spiner } from "../../../../components/Spiner";

export const TableComprasDetalles = ({ data, loadingDetalles }) => {
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
            Precio
          </th>

          <th scope="col" className="px-6 py-3">
            SubTotal
          </th>
        </tr>
      </thead>
      <tbody>
        {loadingDetalles ? (
          <tr>
            <td>
              <Spiner />
            </td>
          </tr>
        ) : data.length > 0 ? (
          data.map((el) => {
            return (
              <tr
                key={el.idDetalleVentas}
                className=" dark:bg-gray-800"
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
                  <span className="font-extrabold">
                    x{parseInt(el.cantidad)}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatearNumero(el.precioVenta)}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatearNumero(el.subTotalVenta)}
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="bg-gray-800">
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
