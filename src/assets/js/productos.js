import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/inventario/productos`;

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
export const registrarProductoFachada = async (productoDTO) => {
  return await registrarProducto(productoDTO);
};

export const actualizarProductoFachada = async (codigoBarras, productoDTO) => {
  return await actualizarProducto(codigoBarras, productoDTO);
};

export const obtenerProductoCodigoBarrasFachada = async (codigoBarras) => {
  return await obtenerProductoCodigoBarras(codigoBarras);
};

export const listaProductosFachada = async () => {
  return await listaProductos();
};

export const listaProductosPorNombreFachada = async (nombre) => {
  return await listaProductosPorNombre(nombre);
};

export const desactivarProductoFachada = async (id) => {
  return await desactivarProducto(id);
};

export const listaProductosPorProveedorFachada = async (proveedorId) => {
  return await listaProductosPorProveedor(proveedorId);
};

// Llamadas a la API
const registrarProducto = async (productoDTO) => {
  return apiClient.post('', productoDTO).then(r => r.data);
};

const actualizarProducto = async (codigoBarras, productoDTO) => {
  const encoded = encodeURIComponent(codigoBarras);
  return apiClient.put(`/${encoded}`, productoDTO).then(r => r.data);
};


const obtenerProductoCodigoBarras = async (codigoBarras) => {
  return apiClient.get(`/${codigoBarras}`).then(r => r.data);
};

const listaProductos = async () => {
  return apiClient.get().then(r => r.data);
};

const listaProductosPorNombre = async (nombre) => {
  return apiClient.get(`/porNombre/${nombre}`).then(r => r.data);
};

const desactivarProducto = async (id) => {
  return apiClient.delete(`/${id}`).then(r => r.data);
};

const listaProductosPorProveedor = async (proveedorId) => {
  return apiClient.get(`/proveedor/${proveedorId}`).then(r => r.data);
};