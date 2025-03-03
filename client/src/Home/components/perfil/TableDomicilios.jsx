import React, { useEffect, useState } from "react";
import { SearchPlatos } from "../platos/SearchPlatos";
import {
  createDomiciliosRequest,
  deleteDomiciliosRequest,
  getIdDomiciliosByUsuarios,
  updateDomiciliosRequest,
} from "../../../api/domicilios/domicilios";
import { ModalDomicilios } from "./ModalDomicilios";
import { Spiner } from "../../../components/Spiner";

export const TableDomicilios = ({
  toggleModal,
  closeModal,
  isOpen,
  setDataToEdit,
  dataToEdit,
}) => {
  const [domicilios, setDomicilios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterDomicilios, setFilterDomicilios] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  const getDomiciliosUsuarios = async () => {
    try {
      const { data } = await getIdDomiciliosByUsuarios();
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
        message: "Error en getDomiciliosUsuarios",
      });
    }
  };

  const createDomicilios = async (dataDomicilio) => {
    try {
      const { data } = await createDomiciliosRequest(dataDomicilio);
      if (!data) {
        setDomicilios(null);
        setLoading(false);
        setError(data);
      }
      setDomicilios([...domicilios, data]);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en createDomicilios",
      });
    }
  };

  const updateDomicilios = async (id, dataDomicilio) => {
    try {
      const { data } = await updateDomiciliosRequest(id, dataDomicilio);
      if (!data) {
        setDomicilios(null);
        setLoading(false);
        setError(data);
      }
      let newData = domicilios.map((el) =>
        el.idDomicilios === id ? { ...el, ...data } : el
      );
      setDomicilios(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateDomicilios",
      });
    }
  };

  const deleteDomicilios = async (id) => {
    try {
      const { data } = await deleteDomiciliosRequest(id);
      if (!data) {
        setDomicilios(null);
        setLoading(false);
        setError(data);
      }
      let newData = domicilios.filter((el) => el.idDomicilios !== id);
      setDomicilios(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en deleteDomicilios",
      });
    }
  };

  const editDomicilios = (data) => {
    toggleModal();
    setDataToEdit(data);
  };

  useEffect(() => {
    getDomiciliosUsuarios();
  }, []);


  const handleInputDomicilios = (e)=>{
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setBusquedaActiva(true);
    if (!searchInput) {
      setFilterDomicilios([]);
      setBusquedaActiva(false);
    } else {
      const filtro = domicilios.filter((el) => {
        return el.calle.toLocaleLowerCase().includes(searchInput);
      });
      setFilterDomicilios(filtro);
    }
  }

  const filterDomiciliosDef = busquedaActiva ? filterDomicilios : domicilios;

  return (
    <div className="mt-5 max-w-7xl m-auto">
      <SearchPlatos placeholder={"Buscar por nombre de calle"} handleInputSearch={handleInputDomicilios} />
      <div className="relative overflow-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-black uppercase border-2 ">
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
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {" "}
                    <Spiner />{" "}
                  </td>
                </tr>
              ) : filterDomiciliosDef.length > 0 ? (
                filterDomiciliosDef.map((el) => {
                  return (
                    <tr
                      key={el.idDomicilios}
                      className="bg-gray-800"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                      >
                        {el.codigoPostal}
                      </td>
                      <td className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                        {el.calle}
                      </td>
                      <td className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                        {el.numero}
                      </td>
                      <td className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                        {el.descripcion}
                      </td>
                      <td className="px-6 py-4  font-medium text-white whitespace-nowrap dark:text-white">
                        <button
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                          onClick={() => editDomicilios(el)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-black"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>
                        <button
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => deleteDomicilios(el.idDomicilios)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-black"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                    Sin domicilios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalDomicilios
        isOpen={isOpen}
        closeModal={closeModal}
        getDomiciliosUsuarios={getDomiciliosUsuarios}
        createDomicilios={createDomicilios}
        updateDomicilios={updateDomicilios}
        dataToEdit={dataToEdit}
      />
    </div>
  );
};
