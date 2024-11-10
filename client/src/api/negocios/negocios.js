import axios from '../config/axios.js'

export const getDocimiliosByUsuarioRequest = () => axios.get("/negocios");
export const updateNegociosRequest = (id,data) => axios.put(`/negocios/${id}`,data)
export const updateEstadoNegociosRequest = (id,data)=> axios.patch(`/negociosEstado/${id}`,data)