import React from "react";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";

const initialForm = {
  codigoPostal: "",
  calle: "",
  numero: "",
  descripcion: "",
  idUsuarios: "",
};

export const FormDomcilioCarrito = ({
  onCancelForm,
  agregarNuevoDomicilio,
}) => {
  const {
    codigoPostal,
    calle,
    numero,
    descripcion,
    onInputChange,
    onResetForm,
  } = useForm(initialForm);

  const handleSubmit = (e) => {
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
    agregarNuevoDomicilio(data);
    onResetForm();
    onCancelForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="codigoPostal"
            className="block mb-2 text-sm font-medium text-white"
          >
            Codigo Postal
          </label>
          <input
            type="text"
            name="codigoPostal"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escriba el codigo postal de su locacion"
            onChange={onInputChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="codigoPostal"
             className="block mb-2 text-sm font-medium text-white"
          >
            Calle
          </label>
          <input
            type="text"
            name="calle"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej: Av Libertad"
            onChange={onInputChange}
            required
          />
        </div>

        <div>
          <label
            form="numero"
            className="block mb-2 text-sm font-medium text-white"
          >
            Numero
          </label>
          <input
            type="number"
            name="numero"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej: 1975"
            onChange={onInputChange}
            required
          />
        </div>

        <div>
          <label
            form="descripcion"
            className="block mb-2 text-sm font-medium text-white"
          >
            Descripcion
          </label>
          <textarea
            type="text"
            name="descripcion"
            rows={4}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Agregue una descripcion para que el cadete pueda encontrar su domiclio facilmente"
            onChange={onInputChange}
            required
          />
        </div>
        <div className="lg:col-span-2 md:col-span-1 flex justify-end">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            {" "}
            Enviar{" "}
          </button>
          <button
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none rounded-lg border  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={onCancelForm}
            type="button"
          >
            {" "}
            Cancelar{" "}
          </button>
        </div>
      </div>
    </form>
  );
};
