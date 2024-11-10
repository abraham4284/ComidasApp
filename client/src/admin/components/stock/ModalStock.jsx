import React from "react";
import { useForm } from "../../../hooks/useForm";
import { useProductos } from "../../../context/ProductosContext";
import Swal from "sweetalert2";

const initialForm = {
  stockIngreso: "",
  stockResultante: "",
};

export const ModalStock = ({ isOpen, closeModal, dataToEdit }) => {
  const { stock = "" } = dataToEdit ? dataToEdit : {};
  const {
    stockIngreso,
    stockResultante,
    onInputChange,
    onResetForm,
    formSate,
  } = useForm(initialForm);
  const { updateStockProductos } = useProductos();

  formSate.stockResultante =
    stockIngreso === "" ? "" : parseFloat(stockIngreso) + parseFloat(stock);

  const closeModalResetForm = () => {
    onResetForm();
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stockIngreso) {
      Swal.fire({
        title: "El stock a ingresar es obligatorio",
        icon: "error",
      });
      return;
    }
    const data = {
      stockResultante,
    };
    await updateStockProductos(dataToEdit.idProductos, data);
    onResetForm();
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Alta de stock
                </h3>
                <button
                  type="button"
                  onClick={closeModalResetForm}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Stock actual
                    </label>
                    <input
                      type="number"
                      value={parseInt(stock)}
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Ingrese el stock a cargar
                    </label>
                    <input
                      type="number"
                      name="stockIngreso"
                      value={stockIngreso}
                      onChange={onInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Stock resultante
                    </label>
                    <input
                      type="number"
                      name="stockResultante"
                      value={stockResultante}
                      onChange={onInputChange}
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="0"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Confirmar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
