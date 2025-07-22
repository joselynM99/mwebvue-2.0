import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/inventario/proveedores`;

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
export const registrarProveedorFachada = async (proveedorDTO) => {
  return await registrarProveedor(proveedorDTO);
};

export const actualizarProveedorFachada = async (identificacion, proveedorDTO) => {
  return await actualizarProveedor(identificacion, proveedorDTO);
};

export const obtenerProveedorIdentificacionFachada = async (identificacion) => {
  return await obtenerProveedorIdentificacion(identificacion);
};

export const listaProveedoresFachada = async () => {
  return await listaProveedores();
};

export const listaProveedoresPorNombreComercialFachada = async (nombreComercial) => {
  return await listaProveedoresPorNombreComercial(nombreComercial);
};

export const desactivarProveedorFachada = async (id) => {
  return await desactivarProveedor(id);
};

// Llamadas a la API
const registrarProveedor = async (proveedorDTO) => {
  return apiClient.post('', proveedorDTO).then(r => r.data);
};

const actualizarProveedor = async (identificacion, proveedorDTO) => {
  return apiClient.put(`/${identificacion}`, proveedorDTO).then(r => r.data);
};

const obtenerProveedorIdentificacion = async (identificacion) => {
  return apiClient.get(`/${identificacion}`).then(r => r.data);
};

const listaProveedores = async () => {
  return apiClient.get().then(r => r.data);
};

const listaProveedoresPorNombreComercial = async (nombreComercial) => {
  return apiClient.get(`/porNombre/${nombreComercial}`).then(r => r.data);
};

const desactivarProveedor = async (id) => {
  return apiClient.delete(`/${id}`).then(r => r.data);
};
