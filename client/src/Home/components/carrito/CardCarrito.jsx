import React, { useState } from "react";
import { useCarrito } from "../../../context/CarritoContext";
import { Link } from "react-router-dom";
import { formatearNumero } from "../../../helpers/formatearNumero";
import { CarritoVacio } from "./CarritoVacio";

export const CardCarrito = () => {
  const { carrito, handleIncrement, handleDecrement, counter, deleteProducto } =
    useCarrito();

    console.log(carrito)
  return (
    <>
      {carrito.length > 0
        ? carrito.map((el) => (
            <div
              key={el.idProductos}
              className="max-w-6xl p-5 m-auto border-2 mt-5 "
            >
              <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-2 items-center ">
                <div className="m-auto">
                  <img
                    src={el.img}
                    alt={el.nombre}
                    className="w-52 object-cover object-center"
                  />
                </div>
                <div className="text-center m-auto">
                  <p className="">
                    <b>{el.nombre}</b>
                  </p>
                  <span className="text-slate-600">${el.precioVenta}</span>
                </div>

                <div className="max-w-xs m-auto ">
                  <label
                    htmlFor="quantity-input"
                    className="block mb-2 text-sm font-medium text-gray-900 text-center "
                  >
                    Cantidad
                  </label>
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      type="button"
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      onClick={() => handleDecrement(el.idProductos)}
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <span className="bg-gray-50 border-x-0 w-40 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block  py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {counter[el.idProductos]}
                    </span>
                    <button
                      type="button"
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      onClick={() => handleIncrement(el.idProductos)}
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center mt-0.5">
                    <button
                      className="text-red-500"
                      onClick={() => deleteProducto(el.idProductos)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-bold">
                    {formatearNumero(
                      el.precioVenta * (counter[el.idProductos] || 1)
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        : <CarritoVacio />}
    </>
  );
};
