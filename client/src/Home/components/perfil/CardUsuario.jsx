import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { ModalUsuario } from "./usuario/ModalUsuario";
import { Spiner } from "../../../components/Spiner";

export const CardUsuario = ({ toggleModal, setDataToEdit }) => {
  const { usuarios, getIdUsuarios, usuariosIndividual, loadingIndividual } =
    useAuth();
  const [isOpenModalUsuarios, setIsOpenModalUsuarios] = useState(false);
  const [dataEditUsuarios, setDataEditUsuarios] = useState(null);

  useEffect(() => {
    if (usuarios) {
      getIdUsuarios(usuarios.idUsuarios);
    }
  }, [usuarios]);

  const { img, nombre, apellido, email, DNI, telefono } =
    usuariosIndividual.length > 0 ? usuariosIndividual[0] : {};

  const toggleModalCreate = () => {
    toggleModal();
    setDataToEdit(null);
  };

  const toggleModalEditUsuario = () => {
    setIsOpenModalUsuarios(!isOpenModalUsuarios);
    setDataEditUsuarios(usuariosIndividual[0]);
  };

  const closeMOdalUsuario = () => {
    setIsOpenModalUsuarios(false);
  };

  return (
    <div className="max-w-sm m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        {loadingIndividual ? (
          <Spiner />
        ) : (
          <img
            className="w-36 h-36 mb-3 mt-5 rounded-full shadow-lg object-cover"
            src={img}
            alt={nombre}
          />
        )}
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {loadingIndividual ? "Cargando..." : `${apellido} ${nombre}`}
        </h5>
        <div className="flex flex-col gap-1 ">
          <span className="text-sm flex gap-2 items-center text-gray-500 dark:text-gray-400">
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            {loadingIndividual ? "Cargando..." : email}
          </span>
          <span className="text-sm flex gap-2 items-center text-gray-500 dark:text-gray-400">
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
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
              />
            </svg>
            {loadingIndividual ? "Cargando..." : DNI}
          </span>
          <span className="text-sm flex gap-2 text-gray-500 dark:text-gray-400">
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
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
            {loadingIndividual ? "Cargando..." : telefono}
          </span>
        </div>
        <div className="flex  gap-1 mt-4 md:mt-6">
          {usuarios.rol === "admin" ? (
            ""
          ) : (
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              title="Agregar un nuevo domicilio"
              onClick={toggleModalCreate}
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          )}
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={toggleModalEditUsuario}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>
      </div>
      <ModalUsuario
        isOpen={isOpenModalUsuarios}
        closeModal={closeMOdalUsuario}
        dataEditUsuarios={dataEditUsuarios}
      />
    </div>
  );
};
