import { createContext, useContext, useEffect, useState } from "react";

const CarritContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritContext);
  if (!context) {
    throw new Error("El useCarrito esta fuera del provider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [counter, setCounter] = useState({});

  useEffect(() => {
    const initialCounter = carrito.reduce(
      (acc, item) => {
        if (!(item.idProductos in acc)) {
          acc[item.idProductos] = 1;
        }
        return acc;
      },
      { ...counter }
    );
    setCounter(initialCounter);
  }, [carrito]);

  const handleIncrement = (id) => {
    setCounter((prevCounter) => ({
      ...prevCounter,
      [id]: prevCounter[id] + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCounter((prevCounter) => ({
      ...prevCounter,
      [id]: prevCounter[id] > 1 ? prevCounter[id] - 1 : 1,
    }));
  };

  const agregarCarrito = (producto) => {
    if (!producto) return;
    setCarrito([...carrito, producto]);
  };

  const checkingProductoCarrito = (idProductos) => {
    return carrito.some((el) => el.idProductos === idProductos);
  };

  const deleteProducto = (id) => {
    const deleteProducto = carrito.filter((el) => el.idProductos !== id);
    setCarrito(deleteProducto);
    setCounter((prevCounter) => {
      const { [id]: _, ...newCounter } = prevCounter;
      return newCounter;
    });
  };

  const compraData = carrito.map((el) => ({
    ...el,
    cantidad: counter[el.idProductos],
  }));

  const totalCarrito = () => {
    let total = 0;
    for (let i = 0; i < compraData.length; i++) {
      let { precioVenta, cantidad } = compraData[i];
      let resultado = precioVenta * cantidad;
      total += resultado;
    }

    return {
      total
    };
  };



  const handleResetCarrito = () => {
    setCarrito([]);
    setCounter(1);
  };

  return (
    <CarritContext.Provider
      value={{
        carrito,
        counter,
        compraData,
        agregarCarrito,
        checkingProductoCarrito,
        deleteProducto,
        handleIncrement,
        handleDecrement,
        handleResetCarrito,
        setCarrito,
        totalCarrito
      }}
    >
      {children}
    </CarritContext.Provider>
  );
};
