import React from "react";
import { Navbar } from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { HomePlatosPages } from "../pages/platos/HomePlatosPages";
import { BebidasPages } from "../pages/bebidas/BebidasPages";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { CarritoPage } from "../pages/carrito/CarritoPage";
import { PerfilPage } from "../pages/perfil/PerfilPage";
import { ProtectedRoutesClientes } from "../components/RutasProtegidas/ProtectedRoutesClientes";
import { CarritoFinalizarCompraPage } from "../pages/carrito/CarritoFinalizarCompraPage";
import { ComprasPage } from "../pages/perfil/ComprasPage";
import { ComprasDetallePage } from "../pages/perfil/ComprasDetallePage";
import { ProtectedRoutesCarrito } from "../components/RutasProtegidas/ProtectedRoutesCarrito";
import { Footer } from "../../components/Footer";
import { ProtectedEstadoNegocio } from "../components/RutasProtegidas/ProtectedEstadoNegocio";
import { NegocioCerrado } from "../components/NegocioCerrado";
import { PageContacto } from "../pages/contacto/PageContacto";

export const HomeRoutes = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route element={<ProtectedEstadoNegocio />}>
            <Route path="/" element={<HomePlatosPages />} />
            <Route path="/bebidas" element={<BebidasPages />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route element={<ProtectedRoutesCarrito />}>
              <Route
                path="/finalizar"
                element={<CarritoFinalizarCompraPage />}
              />
            </Route>
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/contacto" element={<PageContacto />} />

          <Route element={<ProtectedRoutesClientes />}>
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/compras" element={<ComprasPage />} />
            <Route path="/compras/:id" element={<ComprasDetallePage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
