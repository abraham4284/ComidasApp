import React from "react";
import { HomeAdmin } from "../pages/HomeAdmin";
import { Route, Routes } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { ProtectedRoutesAdmin } from "../components/rutasProtegidas/ProtectedRoutesAdmin";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { DetalleVentasPage } from "../pages/dashboard/DetalleVentasPage";
import { PedidosPage } from "../pages/pedidos/PedidosPage";
import { ProductosPage } from "../pages/productos/ProductosPage";
import { UsuariosPage } from "../pages/usuarios/UsuariosPage";
import { PedidosDetallePage } from "../pages/pedidos/PedidosDetallePage";
import { StockPage } from "../pages/stock/StockPage";
import { PageNegocio } from "../pages/negocio/PageNegocio";

export const AdminRoutes = () => {
  return (
    <div className="w-full grid lg:grid-cols-12 sm:grid-cols-1 ml-[size of sidebar] mt-5">
      <div className="col-span-2">
        <SideBar />
      </div>
      <main className="p-4 col-span-10 bg-gray-100">
        <Routes>
          <Route element={<ProtectedRoutesAdmin />}>
            <Route path="/" element={<HomeAdmin />} />
            <Route path="negocio" element={<PageNegocio />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="dashboard/ventas/:id" element={<DetalleVentasPage />} />
            <Route path="pedidos" element={<PedidosPage />} />
            <Route path="pedidos/ventas/:id" element={<PedidosDetallePage />} />
            <Route path="productos" element={<ProductosPage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />

          </Route>
        </Routes>
      </main>
    </div>
  );
};
