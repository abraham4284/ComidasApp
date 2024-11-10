import axios from '../config/axios.js';

export const descargarTicketsRequest = (id) => axios.get(`/ticket/${id}`, { responseType : 'blob'});
export const descargarComandaRequest = (id) => axios.get(`/comanda/${id}`, { responseType : 'blob'});