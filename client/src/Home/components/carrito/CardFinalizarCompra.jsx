import React, { useEffect, useState } from "react";
import {
  createDomiciliosRequest,
  getIdDomiciliosByUsuarios,
} from "../../../api/domicilios/domicilios";
import { FormDomcilioCarrito } from "./FormDomcilioCarrito";
import { getFormasPagoRequest } from "../../../api/formaPago/formaPago";
import Swal from "sweetalert2";
import { useCarrito } from "../../../context/CarritoContext";
import { useAuth } from "../../../context/AuthContext";
import { createVentasRequest } from "../../../api/ventas/ventas";
import { useNavigate } from "react-router-dom";
import { formatearNumero } from "../../../helpers/formatearNumero";
import { ModalCarrito } from "./ModalCarrito";
import { SpinnerFinalizarCompra } from "../../../components/Spiner";

export const CardFinalizarCompra = () => {
  const [domicilios, setDomicilios] = useState([]);
  const [formaPago, setFormaPago] = useState([]);
  const [selectedMetodoEnvio, setSelectedMetodoEnvio] = useState("Retiro");
  const [selectedDomicilio, setSelectedDomicilio] = useState(null);
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [estadoVenta, setEstadoVenta] = useState(0);

  const { compraData, handleResetCarrito, totalCarrito } = useCarrito();
  const { usuarios } = useAuth();
  const navigate = useNavigate();

  const { total } = totalCarrito();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getDomicilios = async () => {
    try {
      const { data } = await getIdDomiciliosByUsuarios();
      if (!data) return console.log("No hay data", data);
      setDomicilios(data);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getDomiciliosByUsuarios CardFinalizarComprar.jsx",
      });
    }
  };

  const getFormaPagos = async () => {
    try {
      const { data } = await getFormasPagoRequest();
      if (!data) return console.log("No hay data", data);
      setFormaPago(data);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getFormaPagos CardFinalizarComprar.jsx",
      });
    }
  };

  const agregarNuevoDomicilio = async (dataDomicilio) => {
    try {
      const { data } = await createDomiciliosRequest(dataDomicilio);
      if (!data) return console.log("No hay data", data);
      setDomicilios([...domicilios, data]);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getDomiciliosByUsuarios CardFinalizarComprar.jsx",
      });
    }
  };

  useEffect(() => {
    getDomicilios();
    getFormaPagos();
  }, []);

  const handleAgregarDomicilio = () => {
    setShowForm(true);
  };

  const onCancelForm = () => {
    setShowForm(false);
  };

  const BtnFinalizarCompra = async () => {
    if (selectedFormaPago === null) {
      Swal.fire({
        title: "Debe seleccionar una forma de pago",
        icon: "error",
      });
      return;
    }

    if (!descripcion) {
      Swal.fire({
        title: "La descripcion es obligatoria",
        text: "Si no desea enviar detalles de como quiere su pedido, puede colocar tres puntos '...' y se tomara que el pedido va tal cual su descripcion, gracias su atencion!",
        icon:"warning"
      });
      return;
    }
    if (
      selectedMetodoEnvio === "Envio" &&
      (selectedDomicilio === null || !domicilios)
    ) {
      Swal.fire({
        title: "El campo metodo de envio es obiligatorio",
        text: "Si no tienes un domicilio aun guardado, debes crearlo para poder llevar tu pedido",
        icon: "error",
      });
      return;
    }

    setEstadoVenta(1);

    const datos = {
      carrito: compraData,
      idUsuarios: usuarios.idUsuarios,
      idDomicilios: selectedDomicilio,
      idformaPago: selectedFormaPago,
      descripcion: descripcion,
    };
    const { data } = await createVentasRequest(datos);
    if (data.message === "Venta Registrada") {
      setEstadoVenta(2);
      navigate("/");
      Swal.fire({
        title: "Desea ver su compra?",
        showCancelButton: true,
        confirmButtonText: "Ver mi compra",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(`/compras/${data.idVentas}`);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    setEstadoVenta(0);
    handleResetCarrito();
  };

  console.log(estadoVenta);

  return (
    <div className="max-w-6xl m-auto mt-5 p-6 border border-gray-200 rounded-lg shadow bg-gray-800 md:w-full">
      {/* Titulo y subTotal */}
      <div className="flex justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Total del carrito
        </h5>
        <button
          className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={toggleModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Ver
        </button>
      </div>
      <div className="flex justify-between mt-8">
        <div>
          <span className="text-white text-lg font-bold">SubTotal</span>
        </div>

        <div>
          <span className="text-white text-lg font-bold">
            {formatearNumero(total)}
          </span>
        </div>
      </div>
      {/* Titulo y subTotal  End*/}

      {/* Metodos de envio y pago */}
      <div className="grid gap-2 lg:grid-cols-1 sm:grid-cols-1">
        <div className="w-full mt-3">
          <label className="block mb-2 text-sm font-medium text-white">
            Seleccione el tipo de envio
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="selectedMetodoEnvio"
            onChange={(e) => setSelectedMetodoEnvio(e.target.value)}
          >
            <option defaultValue value="Retiro">
              Retiro en tienda
            </option>
            <option value="Envio">Envio</option>
          </select>
        </div>

        {/* Direcciones guardadas o direccione para agregar */}
        {selectedMetodoEnvio === "Envio" && !showForm > 0 && (
          <div className="w-full mt-3">
            <label className="block mb-2 text-sm font-medium text-white">
              Seleccione el su domicilio
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="selectedDomicilio"
              onChange={(e) => setSelectedDomicilio(e.target.value)}
            >
              <option value="">Seleccione un domicilio</option>
              {domicilios.map((el) => (
                <option key={el.idDomicilios} value={el.idDomicilios}>
                  {`${el.calle} ${el.numero}`}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-end mt-1">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleAgregarDomicilio}
            hidden={selectedMetodoEnvio === "Envio" ? false : true}
          >
            Agregar
          </button>
        </div>
        {/* End Direcciones guardadas o direccione para agregar */}

        {showForm && (
          <FormDomcilioCarrito
            onCancelForm={onCancelForm}
            agregarNuevoDomicilio={agregarNuevoDomicilio}
          />
        )}

        <div className="w-full mt-3">
          <label className="block mb-2 text-sm font-medium text-white">
            Seleccione el metodo de pago
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="selectedFormaPago"
            onChange={(e) => setSelectedFormaPago(e.target.value)}
          >
            <option value="1">Seleccione un metodo de pago</option>
            {formaPago.map((el) => (
              <option key={el.idformaPago} value={el.idformaPago}>
                {" "}
                {el.nombre}{" "}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* End Metodos de envio y pago */}

      {/* Total */}
      <div className="flex justify-between mt-3">
        <div>
          <span className="text-white text-lg font-bold">Total</span>
        </div>

        <div>
          <span className="text-white text-lg font-bold">
            {formatearNumero(total)}
          </span>
        </div>
      </div>

      {/* End Total */}

      {/* Descripcion */}
      <div>
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium text-white mt-5"
        >
          Agregar detalles de tu compra
        </label>
        <textarea
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Agrega los detalles de como quiere su pedido"
        ></textarea>
      </div>
      {/* End Descripcion */}

      {/* Finalizar Compra */}
      <div className="flex justify-end">
        <button
          className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={BtnFinalizarCompra}
          disabled={estadoVenta === 1 && true}
        >
          {estadoVenta === 1 ? (
            <SpinnerFinalizarCompra />
          ) : (
            <>
              Finalizar
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </>
          )}
        </button>
      </div>
      {/* End Finalizar Compra */}
      <ModalCarrito isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
