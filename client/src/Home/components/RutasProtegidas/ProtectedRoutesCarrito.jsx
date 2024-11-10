import React from "react";
import { useCarrito } from "../../../context/CarritoContext";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const ProtectedRoutesCarrito = () => {
  const { carrito } = useCarrito();
  const { usuarios } = useAuth();
  if (carrito.length <= 0 || !usuarios) return <Navigate to="/" replace />;
  return <Outlet />;
};
