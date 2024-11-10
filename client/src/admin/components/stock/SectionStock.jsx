import React, { useEffect, useState } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { TableProductosStockCritico } from "./TableProductosStockCritico";
import { ModalStock } from "./ModalStock";

export const SectionStock = () => {
  const { getProductos, productos, loading } = useProductos();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [stockCritico, setStockCritico] = useState("10");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const filterStockCritico = productos.filter((el) => {
    const stockValue = parseFloat(stockCritico, 10);
    if (isNaN(stockValue)) return true;
    return el.stock < stockValue;
  });

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Stock critico
              </h2>
            </div>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div className="flex items-center max-w-sm mx-auto">
                <label form="simple-search" className="sr-only text-white4">
                  Ingrese un numero
                </label>
                <div className="relative w-full">
                  <input
                    type="number"
                    id="number-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={stockCritico}
                    placeholder="Ingrese un numero"
                    onChange={(e) => setStockCritico(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            {stockCritico.length > 0 ? (
              filterStockCritico.length > 0 ? (
                <TableProductosStockCritico
                  data={filterStockCritico}
                  loading={loading}
                  setDataToEdit={setDataToEdit}
                  toggleModal={toggleModal}
                />
              ) : (
                <h3 className="text-white text-3xl">No hay stockCritico</h3>
              )
            ) : (
              <h3 className="text-white text-3xl">Ingrese un valor</h3>
            )}
          </div>
        </div>
      </div>
      <ModalStock
        isOpen={isOpen}
        dataToEdit={dataToEdit}
        closeModal={closeModal}
      />
    </section>
  );
};
