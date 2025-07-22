import axios from 'axios';

// Cambia si tu variable de entorno tiene otro nombre
const API_BASE_URL = `${process.env.VUE_APP_API_URL}`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token JWT
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Métodos fachada (expuestos para tus componentes)

export const buscarUsuarioPorNombreUsuarioFachada = async (username) => {
  return await buscarUsuarioPorNombreUsuario(username);
};

export const crearUsuarioFachada = async (usuarioDTO) => {
  return await crearUsuario(usuarioDTO);
};

export const listarUsuariosFachada = async () => {
  return await listarUsuarios();
};

export const eliminarUsuarioFachada = async (usuarioId, idNegocio) => {
  return await eliminarUsuario(usuarioId, idNegocio);
};

export const listarRolesFachada = async () => {
  return await listarRoles();
};

export const actualizarUsuarioFachada = async (usuarioDTO) => {
  return await actualizarUsuario(usuarioDTO);
};

// Métodos internos de llamadas a la API

const buscarUsuarioPorNombreUsuario = async (username) => {
  const response = await apiClient.get('/usuario/buscar', {
    params: { username }
  });
  return response.data;
};

const crearUsuario = async (usuarioDTO) => {
  const response = await apiClient.post('/usuario', usuarioDTO);
  return response.data;
};

const listarUsuarios = async () => {
  const response = await apiClient.get(`/usuario`);
  return response.data;
};

const eliminarUsuario = async (usuarioId, idNegocio) => {
  const response = await apiClient.delete(`/usuario/${usuarioId}`, {
    params: { idNegocio }
  });
  return response.data;
};

const listarRoles = async () => {
  const response = await apiClient.get('/negocio/perfiles');
  return response.data;
};

const actualizarUsuario = async (usuarioDTO) => {
  const response = await apiClient.put('/usuario', usuarioDTO);
  return response.data;
};
