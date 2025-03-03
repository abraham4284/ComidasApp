import React, { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";

const initialForm = {
  idDomicilios: null,
  codigoPostal: "",
  calle: "",
  numero: "",
  descripcion: "",
  idUsuarios: "",
};

export const ModalDomicilios = ({
  isOpen,
  closeModal,
  createDomicilios,
  updateDomicilios,
  dataToEdit,
}) => {
  const {
    idDomicilios,
    codigoPostal,
    calle,
    numero,
    descripcion,
    onInputChange,
    onResetForm,
    setFormSate,
  } = useForm(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setFormSate(dataToEdit);
    } else {
      setFormSate(initialForm);
    }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      codigoPostal,
      calle,
      numero,
      descripcion,
    };

    if (!codigoPostal || !calle || !numero || !descripcion) {
      Swal.fire({
        title: "Los campos no pueden enviar vacios",
        text: "Todos los campos son obligatorios",
        icon: "warning",
      });
      return;
    }
    if (idDomicilios === null) {
      await createDomicilios(data);
    } else {
      await updateDomicilios(idDomicilios, data);
    }
    closeModal();
    onResetForm();
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
            <div className="relative rounded-lg shadow bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-white">
                  {dataToEdit ? "Editar domicilio" : "+ Agregar un domiclio"}
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
                    <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                      Codigo Postal
                    </label>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={codigoPostal}
                      onChange={onInputChange}
                      className=" border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                      Calle
                    </label>
                    <input
                      type="text"
                      name="calle"
                      value={calle}
                      onChange={onInputChange}
                      placeholder="Ej: Av Libertad"
                     className=" border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                      Numero
                    </label>
                    <input
                      type="text"
                      name="numero"
                      value={numero}
                      onChange={onInputChange}
                      placeholder="Ej: 1235"
                      className=" border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                      Descripcion
                    </label>
                    <textarea
                      type="text"
                      name="descripcion"
                      value={descripcion}
                      onChange={onInputChange}
                      placeholder="Agrega una descripcion de tu domicilios"
                      className=" border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={
                      dataToEdit
                        ? "w-full focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        : "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    }
                  >
                    {dataToEdit ? "Confirmar" : "Crear"}
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
