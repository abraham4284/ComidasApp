import React, { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";
import { useNegocios } from "../../../context/NegociosContext";

const initialForm = {
  idNegocios: null,
  nombre: "",
  rubro: "",
  descripcion: "",
  img: "",
};

export const ModalNegocios = ({ isOpen, closeModal, dataToEdit }) => {
  const {
    idNegocios,
    nombre,
    rubro,
    descripcion,
    img,

    onInputChange,
    onResetForm,
    setFormSate,
    formSate,
  } = useForm(initialForm);

  const { updateNegocio } = useNegocios();

  const handleSelectedRubro = (e) => {
    setFormSate({
      ...formSate,
      rubro: e.target.value,
    });
  };

  useEffect(() => {
    if (dataToEdit) {
      setFormSate(dataToEdit);
    }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !rubro || !descripcion || !img) {
      Swal.fire({
        title: "Todos los campos son obligatorios",
        icon: "error",
      });
      return;
    }
    await updateNegocio(dataToEdit.idNegocios, formSate);
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
                  Editar negocio
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
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
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={nombre}
                      onChange={onInputChange}
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Img
                    </label>
                    <input
                      type="text"
                      name="img"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={img}
                      onChange={onInputChange}
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Rubro
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={rubro}
                      onChange={handleSelectedRubro}
                    >
                      <option value="">Seleccione una opcion</option>
                      <option value="Gastronomia">Gastronomia</option>
                      <option value="Bebidas">Bebidas</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Descripcion
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={descripcion}
                      onChange={onInputChange}
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
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
