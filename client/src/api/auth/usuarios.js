import axios from '../config/axios.js'

export const registroRequest = (data)=> axios.post("/registro",data);
export const loginRequest = (data)=> axios.post("/login",data);
export const verifyTokenRequest = () => axios.get("/verify");
export const logoutRequest = () => axios.post("/logout");

export const getUsuariosAllRequest = ()=> axios.get("/usuarios");
export const getIdUsuariosRequest = (id)=> axios.get(`/usuarios/${id}`);
export const updateUsuariosPerfilRequest = (id,data)=> axios.put(`/usuarios/${id}`,data);

