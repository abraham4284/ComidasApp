import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../../context/CarritoContext";
import { useProductos } from "../../../context/ProductosContext";

export const CardPlatos = ({ data }) => {
  const { agregarCarrito, checkingProductoCarrito, deleteProducto } =
    useCarrito();
    const { loading } = useProductos();
    
    
  return (
    <>
      {data.length > 0 ? (
        data.map((el) => {
          const productoEncontrado = checkingProductoCarrito(el.idProductos);

          return (
            <div
              className="max-w-sm mt-5 bg-white border border-gray-300 rounded-lg shadow flex flex-col"
              key={el.idProductos}
            >
              <Link>
                <img
                  src={el.img}
                  alt={el.nombre}
                  className="rounded-t-lg h-48 w-full object-cover" // Ajuste de tamaño de imagen
                />
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <Link>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {el.nombre}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700">
                  {el.descripcion}
                </p>
                <div className="flex items-center mb-3">
                  <p className="font-normal text-gray-700">
                    <span className="text-xl text-slate-700">{`$${el.precioVenta}`}</span>
                  </p>
                </div>

                <div className="flex items-center mb-3">
                  <p className="font-normal text-gray-700">
                    <b className="text-2xl text-green-700 animate-pulse">•</b>{" "}
                    {el.estado}
                  </p>
                </div>

                {/* Usa mt-auto para empujar los botones hacia el final */}
                {productoEncontrado ? (
                  <div className="flex justify-end gap-2 mt-auto">
                    <div className="">
                      <button
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                        onClick={() => deleteProducto(el.idProductos)}
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="">
                      <Link
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300"
                        title="Ver carrito"
                        to="/carrito"
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
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2 mt-auto">
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      onClick={() => agregarCarrito(el)}
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
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <h3>No hay datos</h3>
      )}
    </>
  );
};
