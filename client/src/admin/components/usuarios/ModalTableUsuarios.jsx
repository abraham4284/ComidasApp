import React, { useEffect, useState } from "react";
import { getIdDomiciliosRequest } from "../../../api/domicilios/domicilios";

export const ModalTableUsuarios = ({ isOpen, closeModal, dataUser }) => {
  const { idUsuarios, img, nombre, apellido, username } = dataUser
    ? dataUser
    : {};
  const [domicilios, setDomicilios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const domiciliosByUser = async (id) => {
      try {
        const { data } = await getIdDomiciliosRequest(id);
        if (!data) {
          setDomicilios(null);
          setLoading(false);
          setError(data);
        }
        setDomicilios(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log({
          error: error.message,
          errorCompleto: error,
          message: "Error en domiciliosByUser en ModalTableUsuarios",
        });
      }
    };

    domiciliosByUser(idUsuarios);

    return () => {
      setDomicilios([]);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full sm:max-w-md lg:max-w-5xl  ">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      <img
                        src={img}
                        alt={nombre}
                        className="w-12 h-12 rounded-3xl object-cover"
                      />
                    </h3>
                  </div>
                  <div>
                    <span className="text-xl text-white font-bold">
                      {apellido} {nombre} - {username}
                    </span>
                  </div>
                </div>
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
                <div className="relative overflow-auto">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-sm text-white uppercase border-2 ">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Codigo Postal
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Calle
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Numero
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Descripcion
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {domicilios.length > 0 ? (
                          domicilios.map((el) => {
                            return (
                              <tr
                                key={el.idDomicilios}
                                className="bg-white dark:bg-gray-800"
                              >
                                <td
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {el.codigoPostal}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {el.calle}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {el.numero}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {el.descripcion}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="bg-white dark:bg-gray-800">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Sin domicilios registrados
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
