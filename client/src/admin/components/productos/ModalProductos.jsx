import React, { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { useProductos } from "../../../context/ProductosContext";
import Swal from "sweetalert2";

const initialForm = {
  idProductos: null,
  img: "",
  CodeBar: "",
  nombre: "",
  descripcion: "",
  precioCosto: "",
  precioVenta: "",
  stock: "",
  categoria: "",
  tipoProducto: "Unidad",
  familia: "Productos",
  estado: "",
};

export const ModalProductos = ({ isOpen, dataToEdit, closeModal }) => {
  const { onInputChange, onResetForm, setFormSate, formSate } =
    useForm(initialForm);
  const {
    idProductos,
    img,
    CodeBar,
    nombre,
    descripcion,
    precioCosto,
    precioVenta,
    stock,
    categoria,
    tipoProducto,
    familia,
    estado,
  } = formSate;

  const { createProductos, updateProductos } = useProductos();

  const handleSelectedCategoria = (e) => {
    setFormSate({
      ...formSate,
      categoria: e.target.value,
    });
  };

  const handleSelectedEstado = (e) => {
    setFormSate({
      ...formSate,
      estado: e.target.value,
    });
  };

  useEffect(() => {
    if (dataToEdit) {
      setFormSate(dataToEdit);
    } else {
      setFormSate(initialForm);
    }
  }, [dataToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !img ||
      !nombre ||
      !descripcion ||
      !precioCosto ||
      !precioVenta ||
      !stock ||
      !categoria ||
      !estado
    ) {
      Swal.fire({
        title: "Todos los campos son obligatorios",
        icon: "error",
      });
      return;
    }
    if (idProductos === null) {
      createProductos(formSate);
    } else {
      updateProductos(idProductos, formSate);
    }
    closeModal()
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
          <div className="relative p-4 w-full max-w-lg sm:max-w-md md:max-w-5xl h-full md:h-auto overflow-y-auto">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dataToEdit ? "Editar producto" : "+ Agregar un producto"}
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
                  <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Img
                      </label>
                      <input
                        type="text"
                        name="img"
                        value={img}
                        onChange={onInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        CodeBar
                      </label>
                      <input
                        type="text"
                        name="CodeBar"
                        value={CodeBar}
                        onChange={onInputChange}
                        placeholder="Ej: Av Libertad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={onInputChange}
                        placeholder="Ej: 1235"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-1 gap-4 sm:grid-cols-1">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Descripcion
                      </label>
                      <textarea
                        type="text"
                        name="descripcion"
                        value={descripcion}
                        onChange={onInputChange}
                        placeholder="Agrega una descripcion de tu domicilios"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Precio costo
                      </label>
                      <input
                        type="number"
                        name="precioCosto"
                        value={precioCosto}
                        onChange={onInputChange}
                        placeholder="Agrega una descripcion de tu domicilios"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Precio venta
                      </label>
                      <input
                        type="number"
                        name="precioVenta"
                        value={precioVenta}
                        onChange={onInputChange}
                        placeholder="Agrega una descripcion de tu domicilios"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={onInputChange}
                        placeholder="Agrega una descripcion de tu domicilios"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        form="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Seleccione una categoria
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={categoria}
                        onChange={handleSelectedCategoria}
                      >
                        <option value="">Seleccione una opcion</option>
                        <option value="comidas">Comidas</option>
                        <option value="bebidas">Bebidas</option>
                      </select>
                    </div>

                    <div>
                      <label
                        form="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Seleccione estado del producto
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={estado}
                        onChange={handleSelectedEstado}
                      >
                        <option value="">Seleccione una opcion</option>
                        <option value="Disponible">Disponible</option>
                        <option value="No Disponible">No Disponible</option>
                      </select>
                    </div>
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
