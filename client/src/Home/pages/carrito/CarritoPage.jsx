import React from "react";
import { CardCarrito } from "../../components/carrito/CardCarrito";
import { Link } from "react-router-dom";
import { useCarrito } from "../../../context/CarritoContext";
import { useAuth } from "../../../context/AuthContext";

export const CarritoPage = () => {
  const { carrito } = useCarrito();
  const { usuarios } = useAuth();

  return (
    <div className="grid p-5 lg:grid-cols-1 sm:grid-cols-1">
      <div className="w-full">
        <CardCarrito />
        <div
          className={
            usuarios
              ? "grid max-w-6xl grid-col-1 justify-end mt-5"
              : "grid max-w-6xl lggrid-col-1 lg:justify-end 5 sm:justify-center mt-5"
          }
        >
          {usuarios ? (
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              to={"/finalizar"}
              hidden={carrito.length > 0 ? false : true}
            >
              Finalizar Compra
            </Link>
          ) : (
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
              hidden={carrito.length > 0 ? false : true}
            >
              <div className="flex gap-4 justify-center text-center">
                <span className="font-medium">Aun no tienes cuenta?</span>
                <Link
                  className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                  to={"/login"}
                >
                  Login
                </Link>
                <Link
                  className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                  to={"/registro"}
                >
                  Registro
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
