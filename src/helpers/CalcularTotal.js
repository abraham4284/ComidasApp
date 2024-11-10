export const calcularTotalCarrito = (data = []) => {
  try {
    let totalPrecioCosto = 0;
    let totalPrecioVenta = 0;
    let ganancia = 0;
    for (let i = 0; i < data.length; i++) {
      let { cantidad, precioCosto, precioVenta } = data[i];
      let resultadoPrevioCosto = cantidad * precioCosto;
      let resultadoPrecioVenta = cantidad * precioVenta;
      let resultadoGanacia = resultadoPrecioVenta - resultadoPrevioCosto;

      totalPrecioCosto += resultadoPrevioCosto;
      totalPrecioVenta += resultadoPrecioVenta;
      ganancia = resultadoGanacia;
    }
    return {
      totalPrecioCosto,
      totalPrecioVenta,
      ganancia,
    };
  } catch (error) {
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en calcularTotalCarrito /helpers",
    });
  }
};
