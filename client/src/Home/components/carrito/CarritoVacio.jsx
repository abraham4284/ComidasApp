import React, { useEffect, useState } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { CarouselCarrito } from "./CarouselCarrito";
import { BannerCarrito } from "./BannerCarrito";

export const CarritoVacio = () => {
  const { productos, getProductos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="w-full">
      <BannerCarrito />
      {/* <CarouselCarrito productos={productos} /> */}
    </div>
  );
};
