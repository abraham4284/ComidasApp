import React, { useEffect, useState } from "react";
import { useNegocios } from "../../../context/NegociosContext";
import { Spiner, SpinnerFinalizarCompra } from "../../../components/Spiner";
import { ModalNegocios } from "./ModalNegocios";

export const CardNegocio = () => {
  const {
    negocios,
    getNegociosByUsuario,
    loading,
    updateEstadoNegocio,
    estadoCarga,
  } = useNegocios();
  const [isOpen, setIsOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const dataUsuariosOpenModal = (data) => {
    setDataToEdit(data);
    toggleModal();
  };

  useEffect(() => {
    getNegociosByUsuario();
  }, []);

  return (
    <section className="w-full">
      {loading ? (
        <Spiner />
      ) : negocios.length > 0 ? (
        negocios.map((el) => {
          return (
            <div
              key={el.idNegocios}
              className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
            >
              <div className="md:flex justify-center">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={el.img}
                    alt={el.nombre}
                  />
                </div>
                <div className="p-8">
                  <h2 className="uppercase tracking-wide  text-indigo-500 font-semibold text-xl">
                    {el.nombre}
                  </h2>
                  <span className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                    {el.rubro}
                  </span>
                  <p className="mt-2 text-gray-500">{el.descripcion}</p>
                  <p className="mt-2 text-gray-500">
                    {el.estado === "Abierto" && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {el.estado}
                      </span>
                    )}

                    {el.estado === "Cerrado" && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        {el.estado}
                      </span>
                    )}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => dataUsuariosOpenModal(el)}
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>

                    {el.estado === "Abierto" ? (
                      estadoCarga === 1 ? (
                        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                          <SpinnerFinalizarCompra />
                        </button>
                      ) : (
                        <button
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          onClick={() =>
                            updateEstadoNegocio(
                              el.idNegocios,
                              "Cerrado",
                              "Abierto"
                            )
                          }
                        >
                          Cerrar negocio
                        </button>
                      )
                    ) : estadoCarga === 1 ? (
                      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        <SpinnerFinalizarCompra />
                      </button>
                    ) : (
                      <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() =>
                          updateEstadoNegocio(
                            el.idNegocios,
                            "Abierto",
                            "Cerrado"
                          )
                        }
                      >
                        Abrir negocio
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h3>Sin datos</h3>
      )}
      <ModalNegocios
        isOpen={isOpen}
        closeModal={closeModal}
        dataToEdit={dataToEdit}
      />
    </section>
  );
};
