import React, { useEffect, useState } from "react";
import { TableUsuarios } from "./TableUsuarios";
import { useAuth } from "../../../context/AuthContext";
import { ModalTableUsuarios } from "./ModalTableUsuarios";
import { ModalUsuario } from "../../../Home/components/perfil/usuario/ModalUsuario";

export const SectionUsuarios = () => {
  const { getUsuariosAll, usuariosAll, loadingAll } = useAuth();
  const [filterUsuarios, setFilterUsuarios] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalEditUsuario = () => {
    setOpenModalEdit(!openModalEdit);
  };

  const closeModalEditUsuarios = () => {
    setOpenModalEdit(false);
  };

  useEffect(() => {
    getUsuariosAll();
  }, []);

  const usuariosClientes = usuariosAll.filter((el) => el.rol === "cliente");

  const handleInputUsuarios = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setBusquedaActiva(true);
    if (!searchInput) {
      setFilterUsuarios([]);
      setBusquedaActiva(false);
    } else {
      const filtro = usuariosClientes.filter((el) => {
        return (
          el.nombre.toLocaleLowerCase().includes(searchInput) ||
          el.apellido.toLocaleLowerCase().includes(searchInput) ||
          el.DNI.toLocaleLowerCase().includes(searchInput) ||
          el.username.toLocaleLowerCase().includes(searchInput)
        );
      });
      setFilterUsuarios(filtro);
    }
  };

  const filterUsuariosDef = busquedaActiva ? filterUsuarios : usuariosClientes;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Productos
            </h2>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div className="flex items-center max-w-sm mx-auto">
                <label form="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-96 ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar por usernamae, nombre, apellido"
                    onChange={handleInputUsuarios}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <TableUsuarios
              data={filterUsuariosDef}
              loadingAll={loadingAll}
              toggleModal={toggleModal}
              setDataUser={setDataUser}
              openModalEditUsuario={openModalEditUsuario}
            />
          </div>
        </div>
      </div>
      <ModalTableUsuarios
        isOpen={isOpen}
        dataUser={dataUser}
        closeModal={closeModal}
      />

      <ModalUsuario
        isOpen={openModalEdit}
        closeModal={closeModalEditUsuarios}
        dataEditUsuarios={dataUser}
      />
    </section>
  );
};
