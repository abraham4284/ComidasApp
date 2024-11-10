import axios from '../config/axios.js'

export const getIdDomiciliosByUsuarios = () => axios.get("/domicilios/usuarios");
export const getIdDomiciliosRequest = (id)=> axios.get(`/domicilios/${id}`);
export const createDomiciliosRequest = (data)=> axios.post("/domicilios",data);
export const updateDomiciliosRequest = (id,data)=> axios.put(`/domicilios/${id}`,data);
export const deleteDomiciliosRequest = (id)=> axios.delete(`/domicilios/${id}`)




