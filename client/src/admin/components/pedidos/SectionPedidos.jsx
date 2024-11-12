import React, { useEffect, useState } from "react";
import { useVentas } from "../../../context/VentasContext";
import { TablePedidos } from "./TablePedidos";
import { Spiner } from "../../../components/Spiner";

export const SectionPedidos = () => {
  const { getVentas, ventas, updateEstadoVentas, loading } = useVentas();
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [duracionFiltro, setDuracionFiltro] = useState("Esta semana");
  const [filterVentas, setFilterVentas] = useState([]);

  useEffect(() => {
    getVentas();
  }, []);

  useEffect(() => {
    const applyFilers = () => {
      let filtro = ventas;

      if (estadoFiltro !== "Todos") {
        if (filtro.length > 0) {
          filtro = filtro.filter((el) => el.estado === estadoFiltro);
        }
      }

      // FIltro por duracion
      const now = new Date();
      if (filtro.length > 0) {
        filtro = filtro.filter((el) => {
          const fechaVenta = new Date(el.fecha);
          switch (duracionFiltro) {
            case "Esta semana":
              const estaSemana = new Date(
                now.setDate(now.getDate() - now.getDay())
              );
              return fechaVenta >= estaSemana;
            case "Este mes":
              const esteMes = new Date(now.getFullYear(), now.getMonth(), 1);
              return fechaVenta >= esteMes;
            case "Los ulitmos 3 meses":
              const ultimosTresMeses = new Date(
                now.setMonth(now.getMonth() - 3)
              );
              return fechaVenta >= ultimosTresMeses;
            case "Los ultimos 6 meses":
              const ultimasSisMeses = new Date(
                now.setMonth(now.getMonth() - 3)
              );
              return fechaVenta >= ultimasSisMeses;
            case "Este año":
              const esteAnio = new Date(now.getFullYear(), 0, 1);
              return fechaVenta >= esteAnio;
            default:
              return true;
          }
        });
      }
      setFilterVentas(filtro);
    };

    applyFilers();
  }, [estadoFiltro, duracionFiltro, ventas]);

  

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-4 items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Mis ordenes
              </h2>
              <button 
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              title="Refrescar"
              onClick={async()=> await getVentas()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  form="order-type"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select order type
                </label>
                <select
                  id="order-type"
                  className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  value={estadoFiltro}
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                >
                  <option defaultValue>Todos</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completado">Completado</option>
                  <option value="Anulado">Anulado</option>
                </select>
              </div>

              <span className="inline-block text-gray-500 dark:text-gray-400">
                {" "}
                from{" "}
              </span>

              <div>
                <label
                  htmlFor="duration"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select duration
                </label>
                <select
                  id="duration"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  value={duracionFiltro}
                  onChange={(e) => setDuracionFiltro(e.target.value)}
                >
                  <option defaultValue>Esta semana</option>
                  <option value="Este mes">Este mes</option>
                  <option value="Los ultimos 3 meses">
                    Los ultimos 3 meses
                  </option>
                  <option value="Los ultimos 6 meses">
                    Los ultimos 6 meses
                  </option>
                  <option value="Esta año">Esta año</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <TablePedidos
              data={filterVentas}
              updateEstadoVentas={updateEstadoVentas}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
