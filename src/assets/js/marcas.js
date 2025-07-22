import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/inventario/marcas`;

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
export const registrarMarcaFachada = async (marcaDTO) => {
  return await registrarMarca(marcaDTO);
};

export const actualizarMarcaFachada = async (id, marcaDTO) => {
  return await actualizarMarca(id, marcaDTO);
};

export const obtenerMarcaIdFachada = async (id) => {
  return await obtenerMarcaId(id);
};

export const listaMarcasFachada = async () => {
  return await listaMarcas();
};

export const listaMarcasPorNombreFachada = async (nombre) => {
  return await listaMarcasPorNombre(nombre);
};

export const desactivarMarcaFachada = async (id) => {
  return await desactivarMarca(id);
};

// Llamadas a la API
const registrarMarca = async (marcaDTO) => {
  return apiClient.post('', marcaDTO).then(r => r.data);
};

const actualizarMarca = async (id, marcaDTO) => {
  return apiClient.put(`/${id}`, marcaDTO).then(r => r.data);
};

const obtenerMarcaId = async (id) => {
  return apiClient.get(`/${id}`).then(r => r.data);
};

const listaMarcas = async () => {
  return apiClient.get().then(r => r.data);
};

const listaMarcasPorNombre = async (nombre) => {
  return apiClient.get(`/buscar`, {
    params: { nombre }
  }).then(r => r.data);
};


const desactivarMarca = async (id) => {
  return apiClient.delete(`/${id}`).then(r => r.data);
};
