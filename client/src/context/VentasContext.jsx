import { createContext, useContext, useState } from "react";
import {
  createVentasRequest,
  getIdDetalleVentasRequest,
  getIdVentasRequest,
  getVentasByUsuariosRequest,
  getVentasRequest,
  updateEstadoVentasRequest,
} from "../api/ventas/ventas";
import Swal from "sweetalert2";
import { fechaLocal } from "../helpers/FechaLocal";

const VentasContext = createContext();

export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error("el useVentas tiene que estar dentro del provider");
  }

  return context;
};

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingVentasByUsuarios, setLoadingVentasByUsuarios] = useState(true)
  const [error, setError] = useState(null);

  const [detalleVentas, setDetalleVentas] = useState([]);
  const [loadingDetalles, setLoadingDetalles] = useState(true);
  const [errorDetalles, setErrorDetalles] = useState(null);

  

  const [totalFechasPorRango, setTotalFechasPorRango] = useState("");
  const [totalPorFecha, setTotalPorFecha] = useState("");
  const [totalesGenerales, setTotalesGenerales] = useState("");
  const [totalVentasHoyData, setTotalVentasHoy] = useState("");

  const [filtroVentasPorRango, setFiltroVentasPorRango] = useState([]);

  const [mostrarParaImprimir, setMostrarParaImprimir] = useState(false);

  const getVentas = async () => {
    try {
      
      const { data } = await getVentasRequest();
      if (!data) {
        setVentas(null);
        setLoading(false);
        setError(data);
      }
      setVentas(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registro getVentas",
      });
    }
  };

  const getVentasUsuarios = async () => {
    try {
      const { data } = await getVentasByUsuariosRequest();
      if (!data) {
        setVentas(null);
        setLoadingVentasByUsuarios(false);
        setError(data);
      }
      setVentas(data);
      setLoadingVentasByUsuarios(false);
      setError(data);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registro getVentas",
      });
    }
  };

  const getIdVentas = async (id) => {
    try {
      const { data } = await getIdVentasRequest(id);
      if (!data) {
        setVentas(null);
        setLoading(false);
        setError(data);
      }
      setVentas(data);
      setLoading(false);
      setError(data);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registro getVentas",
      });
    }
  };

  const getIdDetalleVentas = async (id) => {
    try {
      const { data } = await getIdDetalleVentasRequest(id);
      if (!data) {
        setDetalleVentas(null);
        setLoadingDetalles(false);
        setErrorDetalles(data);
      }
      setDetalleVentas(data);
      setLoadingDetalles(false);
      setErrorDetalles(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registro getDetalleVentas",
      });
    }
  };

  const createVentas = async (dataVentas) => {
    try {
      const { data } = await createVentasRequest(dataVentas);
      if (!data) {
        setVentas(null);
        setLoading(false);
        setError(data);
      }
      setVentas([...ventas, data]);
      setLoading(false);
      setError(data);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registro createVentas",
      });
    }
  };

  const updateEstadoVentas = async (id, estado, campo) => {
    try {
      if (campo === "Pendiente") {
        Swal.fire({
          title: "Completar venta?",
          text: "Recuerda que el pedido tiene que estar pagado y entregado al cliente",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Completar",
          denyButtonText: `No Completar`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await updateEstadoVentasRequest(id, { estado });
            if (!data) {
              setVentas(null);
              setLoading(false);
              setError(data);
            }
            setVentas(data);
            setLoading(false);
            setError(null);
            Swal.fire("Venta completada", "", "success");
            await getVentas();
          } else if (result.isDenied) {
            Swal.fire("La venta no se completó", "", "info");
          }
        });
      } else if (campo === "Completado") {
        Swal.fire({
          title: "Volver la venta a pendiente?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Confirmar pendiente",
          denyButtonText: `No confirmar`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await updateEstadoVentasRequest(id, { estado });
            if (!data) {
              setVentas(null);
              setLoading(false);
              setError(data);
            }
            setVentas(data);
            setLoading(false);
            setError(null);
            await getVentas();
            Swal.fire("Accion retrotraída", "", "success");
          } else if (result.isDenied) {
            Swal.fire("La accion no se completó", "", "info");
          }
        });
      } else if (campo === "Anular") {
        Swal.fire({
          title: "Estas seguro de anular esta venta?",
          text: "Recuerda que una vez anulada la venta, el stock que se resto se vuelve a sumar y esta opcion desaparecera, solo se puede utlizar una sola vez",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Confirmar anuluacion",
          denyButtonText: `No confirmar`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await updateEstadoVentasRequest(id, { estado });
            if (!data) {
              setVentas(null);
              setLoading(false);
              setError(data);
            }

            setVentas(data);
            setLoading(false);
            setError(null);
            await getVentas();
            Swal.fire("Anulacion completada", "", "success");
          } else if (result.isDenied) {
            Swal.fire("La accion no se completó", "", "info");
          }
        });
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en registro createVentas",
      });
    }
  };

  const sumarTotalesPorRangoFechas = (data = [], fechaInicio, fechaFin) => {
    try {
      if (!data || !fechaInicio || !fechaFin) return;

      let totalCostoPorRango = 0;
      let totalVentaPorRango = 0;
      let totalGanaciasPorRango = 0;

      const filtroVentasPorRangoFechas = data.filter((el) => {
        const fechaVenta = el.fecha;
        return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
      });

      filtroVentasPorRangoFechas.forEach((el) => {
        if (el.estado === "Completado") {
          totalCostoPorRango += Number(el.totalCosto);
          totalVentaPorRango += Number(el.totalVenta);
          totalGanaciasPorRango = totalVentaPorRango - totalCostoPorRango;
          setTotalFechasPorRango({
            totalCostoPorRango,
            totalVentaPorRango,
            totalGanaciasPorRango,
          });
        }
      });

      setFiltroVentasPorRango(filtroVentasPorRangoFechas);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en sumarTotalesPorRangoFechas VentasContext",
      });
    }
  };

  const sumarTotalesPorFecha = (data = [], fechaInicio) => {
    try {
      if (!data || !fechaInicio) return;

      let totalCostoPorDia = 0;
      let totalVentaPorDia = 0;
      let totalGanaciasPorDia = 0;

      const filtroVentasPorFecha = data.filter(
        (el) => el.fecha === fechaInicio
      );

      filtroVentasPorFecha.forEach((el) => {
        if (el.estado === "Completado") {
          totalCostoPorDia += Number(el.totalCosto);
          totalVentaPorDia += Number(el.totalVenta);
          totalGanaciasPorDia = totalVentaPorDia - totalCostoPorDia;
          setTotalPorFecha({
            totalCostoPorDia,
            totalVentaPorDia,
            totalGanaciasPorDia,
          });
        }
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en sumarTotalesPorFecha VentasContext",
      });
    }
  };




  const sumarTotalesHoy = (data = []) => {
    try {
      let totalCostoHoy = 0;
      let totalVentasHoy = 0;
      let totalGanaciaHoy = 0;
      const { HoyfechaLocal } = fechaLocal();
      const filterVentasHoy = data.filter((el) => el.fecha === HoyfechaLocal);

      filterVentasHoy.forEach((el) => {
        if (el.estado === "Completado") {
          totalCostoHoy += Number(el.totalCosto);
          totalVentasHoy += Number(el.totalVenta);
          totalGanaciaHoy = totalVentasHoy - totalCostoHoy;
          setTotalVentasHoy({
            totalCostoHoy,
            totalVentasHoy,
            totalGanaciaHoy,
          });
        }
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en sumarTotalesHoy VentasContext",
      });
    }
  };

  const sumarTotalesGenerales = (data = []) => {
    try {
      let totalCostoGeneral = 0;
      let totalVentaGeneral = 0;
      let totalGanaciaGeneral = 0;

      data.forEach((el) => {
        if (el.estado === "Completado") {
          totalCostoGeneral += Number(el.totalCosto);
          totalVentaGeneral += Number(el.totalVenta);
          totalGanaciaGeneral = totalVentaGeneral - totalCostoGeneral;
          setTotalesGenerales({
            totalCostoGeneral,
            totalVentaGeneral,
            totalGanaciaGeneral,
          });
        }
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en sumarTotalesGenerales VentasContext",
      });
    }
  };

  const handleResetTotales = () => {
    setTotalFechasPorRango("");
    setTotalPorFecha("");
    setFiltroVentasPorRango(ventas);
  };


  const handleResetVentas = () =>{
    setVentas([]);
  }

  const handleResetDetalleVentas = () =>{
    setDetalleVentas([])
  }

  const handleBeforePrint = () => {
    setMostrarParaImprimir(true);
  };
  const handleAfterPrint = () => {
    setMostrarParaImprimir(false);
  };

  const onClickPrint = () => {
    handleBeforePrint();
    setTimeout(() => {
      window.print();
      handleAfterPrint();
    }, 0);
  };

  return (
    <VentasContext.Provider
      value={{
        ventas,
        detalleVentas,
        loading,
        loadingDetalles,
        loadingVentasByUsuarios,
        error,
        errorDetalles,
        totalFechasPorRango,
        totalPorFecha,
        totalesGenerales,
        totalVentasHoyData,
        filtroVentasPorRango,
        mostrarParaImprimir,
        getVentas,
        getIdDetalleVentas,
        getIdVentas,
        getVentasUsuarios,
        createVentas,
        sumarTotalesPorRangoFechas,
        sumarTotalesPorFecha,
        sumarTotalesGenerales,
        sumarTotalesHoy,
        handleResetTotales,
        updateEstadoVentas,
        setLoading,
        setLoadingDetalles,
        handleResetVentas,
        handleResetDetalleVentas,

        handleBeforePrint,
        handleAfterPrint,
        onClickPrint
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};
