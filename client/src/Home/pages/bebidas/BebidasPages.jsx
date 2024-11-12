import React, { useEffect, useState } from "react";
import { SearchPlatos } from "../../components/platos/SearchPlatos";
import { CardProductos } from "../../components/productos/CardProductos";
import { useProductos } from "../../../context/ProductosContext";
import { Spiner } from "../../../components/Spiner";

export const BebidasPages = () => {
  const { productosBebidas, getProductosBebidas, loadingBebidas } =
    useProductos();
  const [filterBebidas, setFilterBebidas] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  useEffect(() => {
    getProductosBebidas();
  }, []);

  const handleInputBebidas = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setBusquedaActiva(true);
    if (!searchInput) {
      setFilterBebidas([]);
      setBusquedaActiva(false);
    } else {
      const filtro = productosBebidas.filter((el) => {
        return el.nombre.toLocaleLowerCase().includes(searchInput);
      });
      setFilterBebidas(filtro);
    }
  };

  const filterBebidasDef = busquedaActiva ? filterBebidas : productosBebidas;


  return (
    <section className="p-4">
      <SearchPlatos
        handleInputSearch={handleInputBebidas}
        placeholder={"Busque por nombre de bebidas"}
      />
      <div className="m-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loadingBebidas ? (
          <div className="col-span-12 m-auto ">
            <Spiner />
          </div>
        ) : (
          <CardProductos data={filterBebidasDef} />
        )}
      </div>
    </section>
  );
};
