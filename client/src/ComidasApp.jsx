import React from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { ProductosProvider } from "./context/ProductosContext";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { VentasProvider } from "./context/VentasContext";
import { NegociosProvider } from "./context/NegociosContext";

export const ComidasApp = () => {
  return (
    <AuthProvider>
      <NegociosProvider>
        <VentasProvider>
          <CarritoProvider>
            <ProductosProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </ProductosProvider>
          </CarritoProvider>
        </VentasProvider>
      </NegociosProvider>
    </AuthProvider>
  );
};
