import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/inventario/subproductos`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Métodos fachada
export const registrarSubproductoFachada = async (subproductoDTO) => {
  return await registrarSubproducto(subproductoDTO);
};

export const actualizarSubproductoFachada = async (codigoBarras, subproductoDTO) => {
  return await actualizarSubproducto(codigoBarras, subproductoDTO);
};

export const obtenerSubproductoCodigoBarrasFachada = async (codigoBarras) => {
  return await obtenerSubproductoCodigoBarras(codigoBarras);
};

export const listaSubproductosFachada = async () => {
  return await listaSubproductos();
};

export const listaSubproductosPorNombreFachada = async (nombre) => {
  return await listaSubproductosPorNombre(nombre);
};

export const desactivarSubproductoFachada = async (id) => {
  return await desactivarSubproducto(id);
};

// Llamadas a la API
const registrarSubproducto = async (subproductoDTO) => {
  return apiClient.post('', subproductoDTO).then(r => r.data);
};

const actualizarSubproducto = async (codigoBarras, subproductoDTO) => {
  return apiClient.put(`/${codigoBarras}`, subproductoDTO).then(r => r.data);
};

const obtenerSubproductoCodigoBarras = async (codigoBarras) => {
  return apiClient.get(`/${codigoBarras}`).then(r => r.data);
};

const listaSubproductos = async () => {
  return apiClient.get().then(r => r.data);
};

const listaSubproductosPorNombre = async (nombre) => {
  return apiClient.get(`/porNombre/${nombre}`).then(r => r.data);
};

const desactivarSubproducto = async (id) => {
  return apiClient.delete(`/${id}`).then(r => r.data);
};
