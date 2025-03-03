import React, { useEffect, useState } from "react";
import { useVentas } from "../../../context/VentasContext";
import { TableCompras } from "../../components/perfil/compras/TableCompras";

export const ComprasPage = () => {
  const { ventas, getVentasUsuarios, loadingVentasByUsuarios } = useVentas();
  const [filterVentas, setFilterVentas] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  useEffect(() => {
    getVentasUsuarios();
  }, []);

  const handleInputDate = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setBusquedaActiva(true);
    if (!searchInput) {
      setFilterVentas([]);
      setBusquedaActiva(false);
    } else {
      const filtro = ventas.filter((el) => {
        return el.fecha.toLocaleLowerCase().includes(searchInput);
      });
      setFilterVentas(filtro);
    }
  };


  const filterVentasDef = busquedaActiva ? filterVentas : ventas;

  return (
    <div className="w-full mt-5">
      <div className="grid gap-5 p-6 lg:grid-cols-1 sm:grid-cols-1">
        <div className="gap-4 sm:flex sm:items-center sm:justify-start">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Mis compras
          </h2>

          <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
            <div>
              <input
                type="date"
                onChange={handleInputDate}
                className=" border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5">
          <TableCompras data={filterVentasDef} loading = {loadingVentasByUsuarios} />
        </div>
      </div>
    </div>
  );
};
