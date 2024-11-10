import React, { useEffect } from "react";
import { useForm } from "../../../../hooks/useForm";
import { useAuth } from "../../../../context/AuthContext";

const initialForm = {
  idUsuarios: null,
  img: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  password: ""
};

export const ModalUsuario = ({ isOpen, closeModal, dataEditUsuarios }) => {
  const {
    idUsuarios,
    img,
    nombre,
    apellido,
    email,
    telefono,
    password,
    onInputChange,
    setFormSate,
  } = useForm(initialForm);

  const { updateUsuariosPerfil } = useAuth();



  useEffect(() => {
    if (dataEditUsuarios) {
      const editData = {
        idUsuarios: dataEditUsuarios.idUsuarios,
        img: dataEditUsuarios.img,
        nombre: dataEditUsuarios.nombre,
        apellido: dataEditUsuarios.apellido,
        email: dataEditUsuarios.email,
        telefono: dataEditUsuarios.telefono,
        password: dataEditUsuarios.password
      };
      setFormSate(editData);
    }
  }, [dataEditUsuarios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      img,
      nombre,
      apellido,
      email,
      telefono,
      password
    };
    await updateUsuariosPerfil(idUsuarios,data);
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
                  Editar perfil
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
                      IMG URL
                    </label>
                    <input
                      type="text"
                      name="img"
                      value={img}
                      onChange={onInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
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
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={apellido}
                      onChange={onInputChange}
                      placeholder="Ej: Av Libertad"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={onInputChange}
                      placeholder="Ej: 1235"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Telefono
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      value={telefono}
                      onChange={onInputChange}
                      placeholder="Ej: 1235"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={onInputChange}
                      placeholder="Ej: 1235"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
