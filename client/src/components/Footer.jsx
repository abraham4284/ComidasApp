import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNegocios } from "../context/NegociosContext";

export const Footer = () => {
  const { getNegociosByUsuario, negocios } = useNegocios();

  useEffect(() => {
    getNegociosByUsuario();
  }, []);

  const { img, nombre } = negocios.length > 0 ? negocios[0] : {};

  return (
    <footer className="bg-white shadow dark:bg-gray-900 mt-5">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={img}
              className="h-8 w-auto rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              alt={nombre}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {nombre}
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/contacto" className="hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a
            href="https://abraham-apas.onrender.com/"
            className="hover:underline"
            target="_blank"
          >
            {"</>AbrahamTech"}
          </a>
          . Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};
