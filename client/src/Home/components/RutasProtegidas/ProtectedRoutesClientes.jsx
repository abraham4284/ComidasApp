import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { Spiner } from "../../../components/Spiner";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutesClientes = () => {
  const { isAutenticated, loading } = useAuth();
  if(loading) return <Spiner />
  if(!loading && !isAutenticated) return <Navigate to="/login" replace />
  return <Outlet />;
};
