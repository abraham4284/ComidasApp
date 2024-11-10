import React from "react";
import { CardFinalizarCompra } from "../../components/carrito/CardFinalizarCompra.jsx";

export const CarritoFinalizarCompraPage = () => {
  return (
    <div className="w-full">
      <div className="grid gap-5 p-6 lg:grid-cols-1 sm:grid-cols-1">
        <div className="">
          <CardFinalizarCompra />
        </div>
      </div>
    </div>
  );
};
