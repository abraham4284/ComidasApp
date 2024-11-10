import axios from '../config/axios.js'

export const getProductosRequest = ()=> axios.get("/productos");
export const getProductosComidasRequest = ()=> axios.get("/productos/comidas");
export const getProductosBebidasRequest = ()=> axios.get("/productos/bebidas");

export const createProductosRequest = (data) => axios.post("/productos",data)
export const updateProductosRequest = (id,data)=> axios.put(`/productos/${id}`,data)
export const updateStockProductosRequest = (id,data)=> axios.put(`/productoStock/${id}`,data)
export const updateEstadoProductosRequest = (id,data)=> axios.put(`/productoEstado/${id}`,data)
export const deleteProductosRequest = (id)=> axios.delete(`/productos/${id}`)

