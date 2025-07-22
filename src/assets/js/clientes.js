import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/clientes`;

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
export const crearClienteFachada = async (clienteDTO) => {
  return await crearCliente(clienteDTO);
};

export const obtenerClientesFachada = async () => {
  return await obtenerClientes();
};

export const actualizarClienteFachada = async (identificacionOriginal,clienteDTO) => {
  return await actualizarCliente(identificacionOriginal, clienteDTO);
};

export const obtenerClientePorIdentificacionFachada = async (identificacion) => {
  return await obtenerClientePorIdentificacion(identificacion);
};

export const buscarClientesPorNombreFachada = async (nombre) => {
  return await buscarClientesPorNombre(nombre);
};

// Llamadas a la API

// POST /clientes
const crearCliente = async (clienteDTO) => {
  return apiClient.post('', clienteDTO).then(r => r.data);
};

// GET /clientes
const obtenerClientes = async () => {
  return apiClient.get('').then(r => r.data);
};

// PUT /clientes
const actualizarCliente = async (identificacionOriginal, clienteDTO) => {
  return apiClient.put(`/${identificacionOriginal}`, clienteDTO).then(r => r.data);
};

// GET /clientes/{identificacion}
const obtenerClientePorIdentificacion = async (identificacion) => {
  return apiClient.get(`/${identificacion}`).then(r => r.data);
};

// GET /clientes/porNombre/{nombre}
const buscarClientesPorNombre = async (nombre) => {
  return apiClient.get(`/porNombre/${nombre}`).then(r => r.data);
};
