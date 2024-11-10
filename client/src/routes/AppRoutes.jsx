import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeRoutes } from "../Home/routes/HomeRoutes";
import { AdminRoutes } from "../admin/routes/AdminRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomeRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};
