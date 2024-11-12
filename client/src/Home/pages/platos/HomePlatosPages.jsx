import React, { useEffect, useState } from "react";
import { CardPlatos } from "../../components/platos/CardPlatos";
import { SearchPlatos } from "../../components/platos/SearchPlatos";
import { useProductos } from "../../../context/ProductosContext";
import { Spiner } from "../../../components/Spiner";

export const HomePlatosPages = () => {
  const {
    getProductosComidas,
    productosComidas,
    loadingComidas,
  } = useProductos();
  const [filterPlatos, setFilterPlatos] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  useEffect(() => {
    getProductosComidas();

  }, []);

  const handleInpuPlatos = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setBusquedaActiva(true);
    if (!searchInput) {
      setFilterPlatos([]);
      setBusquedaActiva(false);
    } else {
      const filtro = productosComidas.filter((el) => {
        return el.nombre.toLocaleLowerCase().includes(searchInput);
      });
      setFilterPlatos(filtro);
    }
  };

  const filterPlatosDef = busquedaActiva ? filterPlatos : productosComidas;

  return (
    <section className="p-4">
      <SearchPlatos
        handleInputSearch={handleInpuPlatos}
        placeholder={"Busque por nombre del plato"}
      />
      <div className="m-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loadingComidas ? (
          <div className="col-span-12 m-auto ">
            <Spiner />
          </div>
        ) : (
          <CardPlatos data={filterPlatosDef} />
        )}
      </div>
    </section>
  );
};
