import axios from '../config/axios.js'

export const getFormasPagoRequest = ()=> axios.get("formaPago");
