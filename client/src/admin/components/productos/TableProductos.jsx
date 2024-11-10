import React from "react";
import { formatearNumero } from "../../../helpers/formatearNumero";
import { useProductos } from "../../../context/ProductosContext";
import { Spiner } from "../../../components/Spiner";

export const TableProductos = ({
  data,
  setDataToEdit,
  toggleModal,
  loading,
}) => {
  const { deleteProductos } = useProductos();

  const openModal = (data) => {
    setDataToEdit(data);
    toggleModal();
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {loading ? (
        <div className="flex justify-center">
          <Spiner />
        </div>
      ) : data.length > 0 ? (
        data.map((el) => (
          <div
            key={el.idProductos}
            className="flex flex-wrap items-center gap-y-4 py-6"
          >
            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Img
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                <img
                  src={el.img}
                  alt={el.nombre}
                  className="w-12 h-12 rounded-3xl object-cover"
                />
              </dd>
            </dl>
            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Nombre
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                <a href="#" className="hover:underline">
                  {el.nombre}
                </a>
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Precio costo
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-white dark:text-white">
                <a href="#" className="hover:underline">
                  {formatearNumero(el.precioCosto)}
                </a>
              </dd>
            </dl>
            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Precio venta
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                <a href="#" className="hover:underline">
                  {formatearNumero(el.precioVenta)}
                </a>
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Stock
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                <a href="#" className="hover:underline">
                  {el.stock}
                </a>
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Categoria
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                <a href="#" className="hover:underline">
                  {el.categoria}
                </a>
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Estado
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                {el.estado === "Disponible" && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    {el.estado}
                  </span>
                )}

                {el.estado === "No Disponible" && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    {el.estado}
                  </span>
                )}
              </dd>
            </dl>

            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
              <button
                type="button"
                className="w-full rounded-lg border border-yellow-500 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-500 dark:hover:text-white dark:focus:ring-yellow-500 lg:w-auto"
                onClick={() => openModal(el)}
              >
                <div className="flex gap-2 items-center">
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span>Editar</span>
                </div>
              </button>

              <button
                type="button"
                className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                onClick={() => deleteProductos(el.idProductos)}
              >
                <div className="flex gap-2 items-center">
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <span>Eliminar</span>
                </div>
              </button>
            </div>
          </div>
        ))
      ) : (
        ""
      )}
    </div>
  );
};
