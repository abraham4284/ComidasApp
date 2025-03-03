import { useContext, createContext, useState, useEffect } from "react";
import {
  getIdUsuariosRequest,
  getUsuariosAllRequest,
  loginRequest,
  logoutRequest,
  registroRequest,
  updateUsuariosPerfilRequest,
  verifyTokenRequest,
} from "../api/auth/usuarios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El useAuth esta fuera del provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosIndividual, setUsuariosIndividual] = useState([]);
  const [usuariosAll, setUsuariosAll] = useState([]);

  const [loadingAll, setLoadingAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingIndividual, setLoadingIndividual] = useState(true);
  const [isAutenticated, setIsAutenticated] = useState(false);

  const [estadoCarga, setEstadoCarga] = useState(0);

  const [error, setError] = useState(null);
  const [errorAll, setErrorAll] = useState(null);

  const registro = async (dataUser) => {
    try {
      setEstadoCarga(1);
      const { data } = await registroRequest(dataUser);
      if (!data) {
        setUsuarios(null);
        setLoading(false);
        setIsAutenticated(false);
        setError(data);
        setEstadoCarga(3);
      } else {
        setEstadoCarga(2);
        setUsuarios(data);
        setIsAutenticated(true);
        setLoading(false);
        setError(null);
      }
      setEstadoCarga(0);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registro AuthContext",
      });
      setEstadoCarga(3);
    }
  };

  const login = async (dataUser) => {
    try {
      setEstadoCarga(1);
      const { data } = await loginRequest(dataUser);
      if (!data) {
        setUsuarios(null);
        setLoading(false);
        setIsAutenticated(false);
        setError(data);
        setEstadoCarga(3);
      } else {
        setEstadoCarga(2);
        setUsuarios(data);
        setIsAutenticated(true);
        setLoading(false);
        setError(null);
      }
      setEstadoCarga(0);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en Login AuthContext",
      });
      setEstadoCarga(3);
    }
  };

  const getUsuariosAll = async () => {
    try {
      const { data } = await getUsuariosAllRequest();
      if (!data) {
        setUsuariosAll(null);
        setLoadingAll(false);
        setIsAutenticated(false);
        setErrorAll(data);
      } else {
        setUsuariosAll(data);
        setLoadingAll(false);
        setIsAutenticated(true);
        setErrorAll(null);
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getUsuariosAll AuthContext",
      });
    }
  };

  const getIdUsuarios = async (id) => {
    try {
      const { data } = await getIdUsuariosRequest(id);
      if (!data) {
        setUsuariosIndividual(null);
        setLoadingIndividual(false);
        setError(data);
      } else {
        setUsuariosIndividual(data);
        setLoadingIndividual(false);
        setError(null);
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en Login AuthContext",
      });
    }
  };

  const updateUsuariosPerfil = async (id, dataUser) => {
    try {
      const { data } = await updateUsuariosPerfilRequest(id, dataUser);
      if (!data) {
        setUsuariosIndividual(null);
        setLoadingIndividual(false);
        setError(data);
      }
      let newData = usuariosIndividual.map((el) =>
        el.idUsuarios === id ? dataUser : el
      );
      setUsuariosIndividual(newData);
      setLoadingIndividual(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en Login updateUsuariosPerfil",
      });
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUsuarios(null);
      setIsAutenticated(false);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en Login logout",
      });
    }
  };

 

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await verifyTokenRequest();
        if (!data) {
          setUsuarios(null);
          setIsAutenticated(false);
          setLoading(false);
          setError(data);
        } else {
          setUsuarios(data);
          setIsAutenticated(true);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setUsuarios(null);
        setIsAutenticated(false);
        setLoading(false);
        setError(error);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuarios,
        usuariosIndividual,
        usuariosAll,
        loading,
        loadingIndividual,
        loadingAll,
        estadoCarga,
        isAutenticated,
        error,
        errorAll,
        registro,
        login,
        logout,
        getIdUsuarios,
        updateUsuariosPerfil,
        getUsuariosAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
