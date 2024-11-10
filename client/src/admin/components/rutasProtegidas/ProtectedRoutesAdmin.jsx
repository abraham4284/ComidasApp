import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Spiner } from '../../../components/Spiner';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutesAdmin = () => {
    const { isAutenticated, loading, usuarios } = useAuth();;
    if(loading) return <Spiner />
    if(!isAutenticated) return <Navigate to="/login"  replace/>
    if(usuarios.rol !== "admin") return <Navigate to="/login"  replace/>
    return <Outlet />;
}
