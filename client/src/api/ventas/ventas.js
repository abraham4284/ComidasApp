import axios from '../config/axios.js'

export const getVentasRequest = ()=> axios.get("/ventas");
export const getIdVentasRequest = (id)=> axios.get(`/ventas/${id}`);
export const getIdDetalleVentasRequest = (id) => axios.get(`/ventas/detalles/${id}`)
export const getVentasByUsuariosRequest = () => axios.get("/ventasUsuarios");


export const createVentasRequest = (data)=> axios.post("/ventas",data);

export const updateEstadoVentasRequest = (id,data)=> axios.put(`/ventas/${id}`,data)
