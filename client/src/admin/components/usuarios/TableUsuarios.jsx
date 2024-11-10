import React from "react";
import { Spiner } from "../../../components/Spiner";

export const TableUsuarios = ({
  data,
  loadingAll,
  setDataUser,
  toggleModal,
  openModalEditUsuario
}) => {
  const oponModalWithDataUser = (data) => {
    setDataUser(data);
    toggleModal();
  };

  const openModalEdit = (data)=>{
    setDataUser(data)
    openModalEditUsuario()
  } 

  return (
    <>
      {loadingAll ? (
        <div className="w-full m-auto">
          <div className="flex justify-center">
            <Spiner />
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length > 0
            ? data.map((el) => (
                <div
                  key={el.idUsuarios}
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
                      Apellido
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-white dark:text-white">
                      <a href="#" className="hover:underline">
                        {el.apellido}
                      </a>
                    </dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="hover:underline">
                        {el.email}
                      </a>
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      DNI
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="hover:underline">
                        {el.DNI}
                      </a>
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Telefono
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="hover:underline">
                        {el.telefono}
                      </a>
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Username
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="hover:underline">
                        {el.username}
                      </a>
                    </dd>
                  </dl>

                  <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                    <button
                      type="button"
                      className="w-full rounded-lg border border-green-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-sky-900 lg:w-auto"
                      onClick={() => oponModalWithDataUser(el)}
                    >
                      <div className="flex gap-2 items-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M18.27 6c1.01 2.17.78 4.73-.33 6.81-.94 1.69-2.29 3.12-3.44 4.69-.5.7-1 1.45-1.37 2.26-.13.27-.22.55-.32.83-.1.28-.19.56-.28.84-.09.26-.2.57-.53.57-.39 0-.5-.44-.58-.74-.24-.73-.48-1.43-.85-2.1-.42-.79-.95-1.52-1.49-2.23L18.27 6M9.12 8.42l-3.3 3.92c.61 1.29 1.52 2.39 2.39 3.49.21.25.42.51.62.78L13 11.67l-.04.01c-1.46.5-3.08-.24-3.66-1.68-.08-.17-.14-.37-.18-.57a3.05 3.05 0 010-1v-.01m-2.54-3.8l-.01.01c-1.62 2.05-1.9 4.9-.93 7.31L9.63 7.2l-.05-.05-3-2.53m7.64-2.26L11 6.17l.04-.01c1.34-.46 2.84.12 3.52 1.34.15.28.27.58.31.88.06.38.08.65.01 1.02v.01l3.2-3.8a6.988 6.988 0 00-3.85-3.24l-.01-.01M9.89 6.89l3.91-4.65-.04-.01C13.18 2.08 12.59 2 12 2c-1.97 0-3.83.85-5.15 2.31l-.02.01 3.06 2.57z" />
                        </svg>
                        <span>Direcciones</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="w-full rounded-lg border border-yellow-500 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-500 dark:hover:text-white dark:focus:ring-yellow-500 lg:w-auto"
                      onClick={() => openModalEdit(el)}
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
                  </div>
                </div>
              ))
            : "Sin datos"}
        </div>
      )}
    </>
  );
};
