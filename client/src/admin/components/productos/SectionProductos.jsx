import React, { useEffect, useState } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { TableProductos } from "./TableProductos";
import { ModalProductos } from "./ModalProductos";

export const SectionProductos = () => {
  const { getProductos, productos, loading } = useProductos();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [filterProductos, setFilterProductos] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleNewProducto = () => {
    setDataToEdit(null);
    toggleModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    if (filterProductos.length > 0) {
      let filterProductosUpdate = productos.filter((el) =>
        filterProductos.some((data) => data.idProductos === el.idProductos)
      );

      setFilterProductos(filterProductosUpdate);
    }
  }, [productos]);

  const handleInputProductos = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setBusquedaActiva(true);
    if (!searchInput) {
      setFilterProductos([]);
      setBusquedaActiva(false);
    } else {
      const filtro = productos.filter((el) => {
        return el.nombre.toLocaleLowerCase().includes(searchInput);
      });
      setFilterProductos(filtro);
    }
  };

  const filterProductosDef = busquedaActiva ? filterProductos : productos;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Productos
              </h2>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={toggleNewProducto}
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
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span> Agregar</span>
                </div>
              </button>
            </div>

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
                    placeholder="Buscar por nombre de producto"
                    onChange={handleInputProductos}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <TableProductos
              data={filterProductosDef}
              setDataToEdit={setDataToEdit}
              toggleModal={toggleModal}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <ModalProductos
        isOpen={isOpen}
        dataToEdit={dataToEdit}
        closeModal={closeModal}
      />
    </section>
  );
};
