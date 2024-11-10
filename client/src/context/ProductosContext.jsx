import { createContext, useContext, useState } from "react";
import {
  createProductosRequest,
  deleteProductosRequest,
  getProductosBebidasRequest,
  getProductosComidasRequest,
  getProductosRequest,
  updateEstadoProductosRequest,
  updateProductosRequest,
  updateStockProductosRequest,
} from "../api/productos/productos.js";
import Swal from "sweetalert2";

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("El usePLatos esta fuera del contexto");
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deteccionCambio, setDeteccionCambio] = useState(false);

  const getProductos = async () => {
    try {
      const { data } = await getProductosRequest();
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }

      setProductos(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getProductos ProductosContext",
      });
    }
  };

  const getProductosComidas = async () => {
    try {
      const { data } = await getProductosComidasRequest();
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }

      setProductos(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getProductosComidas ProductosContext",
      });
    }
  };

  const getProductosBebidas = async () => {
    try {
      const { data } = await getProductosBebidasRequest();
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }

      setProductos(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getProductosComidas ProductosContext",
      });
    }
  };

  const createProductos = async (dataProducto) => {
    try {
      const { data } = await createProductosRequest(dataProducto);
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }
      setProductos([...productos, data]);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en createProductos ProductosContext",
      });
    }
  };

  const updateProductos = async (id, dataProducto) => {
    try {
      const { data } = await updateProductosRequest(id, dataProducto);
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }

      let newData = productos.map((el) =>
        el.idProductos === id ? dataProducto : el
      );
      setProductos(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateProductos ProductosContext",
      });
    }
  };

  const updateStockProductos = async (id, dataProducto) => {
    try {
      const { data } = await updateStockProductosRequest(id, dataProducto);
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }

      let newData = productos.map((el) =>
        el.idProductos === id ? dataProducto : el
      );
      setProductos(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateStockProductos ProductosContext",
      });
    }
  };

  const updateEstadoProductos = async (id, dataProducto) => {
    try {
      const { data } = await updateEstadoProductosRequest(id, dataProducto);
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }

      let newData = productos.map((el) =>
        el.idProductos === id ? dataProducto : el
      );
      setProductos(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateStockProductos ProductosContext",
      });
    }
  };

  const deleteProductos = (id) => {
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: `Eliminaras el producto con el id: ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await deleteProductosRequest(id);
          if (!data) {
            setProductos(null);
            setLoading(false);
            setError(data);
          }
          let newData = productos.filter((el) => el.idProductos !== id);
          setProductos(newData);
          setLoading(false);
          setError(null);

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };


  const onDeteccionCambio = (data)=>{
    if(!data) return;
    setDeteccionCambio(data)
  } 

  return (
    <ProductosContext.Provider
      value={{
        productos,
        loading,
        error,
        deteccionCambio,
        getProductos,
        getProductosComidas,
        getProductosBebidas,
        createProductos,
        updateProductos,
        updateEstadoProductos,
        updateStockProductos,
        deleteProductos,
        onDeteccionCambio
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
