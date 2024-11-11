import { createContext, useContext, useEffect, useState } from "react";
import {
  getDocimiliosByUsuarioRequest,
  updateEstadoNegociosRequest,
  updateNegociosRequest,
} from "../api/negocios/negocios";
import Swal from "sweetalert2";

const NegociosContext = createContext();

export const useNegocios = () => {
  const context = useContext(NegociosContext);
  if (!context) {
    throw new Error("El useNegocios esta fuera del provider");
  }

  return context;
};

export const NegociosProvider = ({ children }) => {
  const [negocios, setNegocios] = useState(() => {
    // Recuperar estado inicial de localStorage o establecer como array vacío
    const savedNegocios = localStorage.getItem("negocios");
    return savedNegocios ? JSON.parse(savedNegocios) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deteccionDeCambio, setDeteccionDeCambio] = useState(false);
  const [estadoCarga, setEstadoCarga] = useState(0);

  const getNegociosByUsuario = async () => {
    try {
      const { data } = await getDocimiliosByUsuarioRequest();
      if (!data) {
        setNegocios(null);
        setLoading(false);
        setError(data);
      }

      setNegocios(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getProductos getNegociosByUsuario",
      });
    }
  };

  const updateNegocio = async (id, dataNegocio) => {
    try {
      setEstadoCarga(1);
      const { data } = await updateNegociosRequest(id, dataNegocio);
      if (!data) {
        setNegocios(null);
        setLoading(false);
        setError(data);
        setEstadoCarga(3);
      } else {
        setEstadoCarga(2);
        let newData = negocios.map((el) =>
          el.idNegocios === id ? dataNegocio : el
        );
        setNegocios(newData);
        setLoading(false);
        setError(null);
      }

      setEstadoCarga(0);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getProductos updateNegocio",
      });
      setEstadoCarga(3);
    }
  };

  const updateEstadoNegocio = (id, estado, campo) => {
    try {
      if (campo === "Abierto") {
        Swal.fire({
          title: "Estas seguro de cerrar el negocio?",
          text: "!Atencion recuerda que esto impacta en lo que ven los clientes, si cierras el negocio los productos no se podran visualizar y solo aparecera un mensaje de negocio esta cerrado y con sus respectivo horarios de atencion.",
          icon: "question",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: `No confirmar`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            setEstadoCarga(1);
            const { data } = await updateEstadoNegociosRequest(id, { estado });
            if (!data) {
              setNegocios(null);
              setLoading(false);
              setError(data);
            } else {
              setEstadoCarga(2);
              let newData = negocios.map((el) =>
                el.idNegocios === id ? data : el
              );
              setNegocios(newData);
              setNegocios(data);
              setDeteccionDeCambio(true);
              setLoading(false);
              setError(null);
              setEstadoCarga(2);
              await getNegociosByUsuario();
              Swal.fire("Negocio cerrado con exito", "", "success");
            }
            setDeteccionDeCambio(false);
            setEstadoCarga(0);
          } else if (result.isDenied) {
            Swal.fire("El negocio no se cerro", "", "info");
          }
        });
      } else if (campo === "Cerrado") {
        Swal.fire({
          title: "Estas seguro de abrir el negocio?",
          text: "!Atencion, una vez el negocio este abierto, todos los clientes podra visualizar los productos disponibles",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: `No confirmar`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            setEstadoCarga(1);
            const { data } = await updateEstadoNegociosRequest(id, { estado });
            if (!data) {
              setNegocios(null);
              setLoading(false);
              setError(data);
            } else {
              let newData = negocios.map((el) =>
                el.idNegocios === id ? data : el
              );
              setNegocios(newData);
              setDeteccionDeCambio(true);
              setLoading(false);
              setError(null);
              setEstadoCarga(2);
              await getNegociosByUsuario();
            }
            Swal.fire("Negocio abierto con exito", "", "success");
            setDeteccionDeCambio(false);
            setEstadoCarga(0);
          } else if (result.isDenied) {
            Swal.fire("La accion no se completó", "", "info");
          }
        });
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateEstadoNegocio ",
      });
      setEstadoCarga(3);
    }
  };

  useEffect(() => {
    // Cargar datos iniciales
    if (negocios.length === 0) {
      getNegociosByUsuario();
    }
  }, []);

  // console.log(deteccionDeCambio)

  return (
    <NegociosContext.Provider
      value={{
        negocios,
        loading,
        error,
        deteccionDeCambio,
        estadoCarga,
        getNegociosByUsuario,
        updateNegocio,
        updateEstadoNegocio,
      }}
    >
      {children}
    </NegociosContext.Provider>
  );
};
