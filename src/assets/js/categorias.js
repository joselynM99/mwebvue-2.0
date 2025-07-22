import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/inventario/secciones`;

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
export const registrarCategoriaFachada = async (categoriaDTO) => {
  return await registrarCategoria(categoriaDTO);
};

export const actualizarCategoriaFachada = async (id, categoriaDTO) => {
  return await actualizarCategoria(id, categoriaDTO);
};

export const obtenerCategoriaIdFachada = async (id) => {
  return await obtenerCategoriaId(id);
};

export const listaCategoriasFachada = async () => {
  return await listaCategorias();
};

export const listaCategoriasPorNombreFachada = async (nombre) => {
  return await listaCategoriasPorNombre(nombre);
};

export const desactivarCategoriaFachada = async (id) => {
  return await desactivarCategoria(id);
};

// Llamadas a la API
const registrarCategoria = async (categoriaDTO) => {
  return apiClient.post('/', categoriaDTO).then(r => r.data);
};

const actualizarCategoria = async (id, categoriaDTO) => {
  return apiClient.put(`/${id}`, categoriaDTO).then(r => r.data);
};

const obtenerCategoriaId = async (id) => {
  return apiClient.get(`/${id}`).then(r => r.data);
};

const listaCategorias = async () => {
  return apiClient.get().then(r => r.data);
};

const listaCategoriasPorNombre = async (nombre) => {
  return apiClient.get(`/buscar-por-nombre/${nombre}`).then(r => r.data);
};

const desactivarCategoria = async (id) => {
  return apiClient.patch(`/${id}`).then(r => r.data);
};
