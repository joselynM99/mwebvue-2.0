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

// Métodos fachada
export const crearCajaFachada = async (cajaDTO) => {
  return await crearCaja(cajaDTO);
};

export const obtenerCajasActivasFachada = async () => {
  return await obtenerCajasActivas();
};

export const desactivarCajaFachada = async (idCaja) => {
  return await desactivarCaja(idCaja);
};

export const actualizarCajaFachada = async (cajaDTO) => {
  return await actualizarCaja(cajaDTO);
};

export const buscarCuadreCajaActivoPorUsuarioFachada = async (usuario) => {
  return await buscarCuadreCajaActivoPorUsuario(usuario);
};

export const abrirCajaFachada = async (cuadreCajaDTO) => {
  return await abrirCaja(cuadreCajaDTO);
};

export const registrarAdicionalFachada = async (adicionalesDTO) => {
  return await registrarAdicional(adicionalesDTO);
};

export const obtenerAdicionalesActivosPorCuadreCajaFachada = async (idCuadreCaja) => {
  return await obtenerAdicionalesActivosPorCuadreCaja(idCuadreCaja);
};

export const desactivarAdicionalFachada = async (idAdicional) => {
  return await desactivarAdicional(idAdicional);
};

export const buscarCuadreCajaFachada = async (usuario, fechaInicio, fechaFin, estado) => {
  return await buscarCuadreCaja(usuario, fechaInicio, fechaFin, estado);
};

export const cerrarCajaFachada = async (cuadreCajaDTO) => {
  return await cerrarCaja(cuadreCajaDTO);
};

export const obtenerCierrePorIdFachada = async (id) => {
  return await obtenerCierrePorId(id);
};


// Llamadas a la API
const crearCaja = async (cajaDTO) => {
  return apiClient.post('/negocio/cajas', cajaDTO).then(r => r.data);
};

const obtenerCajasActivas = async () => {
  return apiClient.get(`/negocio/cajas`).then(r => r.data);
};

const desactivarCaja = async (idCaja) => {
  return apiClient.delete(`/negocio/cajas/${idCaja}`).then(r => r.data);
};

const actualizarCaja = async (cajaDTO) => {
  return apiClient.put('/negocio/cajas', cajaDTO).then(r => r.data);
};

const buscarCuadreCajaActivoPorUsuario = async (usuario) => {
  return apiClient.get(`/negocio/cierreCaja/activo/${encodeURIComponent(usuario)}`)
    .then(r => r.data);
};


const abrirCaja = async (cuadreCajaDTO) => {
  return apiClient.post('/negocio/cierreCaja/abrir', cuadreCajaDTO).then(r => r.data);
};

const registrarAdicional = async (adicionalesDTO) => {
  return apiClient.post('/adicional', adicionalesDTO).then(r => r.data);
};

const obtenerAdicionalesActivosPorCuadreCaja = async (idCuadreCaja) => {
  return apiClient.get(`/adicionales-activos/${idCuadreCaja}`).then(r => r.data);
};

const desactivarAdicional = async (idAdicional) => {
  return apiClient.patch(`/adicional/desactivar/${idAdicional}`).then(r => r.data);
};

const buscarCuadreCaja = async (usuario, fechaInicio, fechaFin, estado) => {
  return apiClient.get(`/buscar`, {
    params: {
      usuario,
      fechaInicio,
      fechaFin,
      estado
    }
  }).then(r => r.data);
};

const cerrarCaja = async (cuadreCajaDTO) => {
  return apiClient.put('/cerrar', cuadreCajaDTO).then(r => r.data);
};

const obtenerCierrePorId = async (id) => {
  return apiClient.get(`/detalle`, {
    params: { id }
  }).then(r => r.data);
};
