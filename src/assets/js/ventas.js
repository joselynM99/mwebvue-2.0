import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/ventas`;

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

const registrarVentas = async (ventaRequestDTO) => {
  return apiClient.post('/', ventaRequestDTO).then(r => r.data);
};

export const registrarVentasFachada = async (ventaRequestDTO) => {
  return await registrarVentas(ventaRequestDTO);
};

const registrarVentasParcial = ventaParcialDTO =>
  apiClient.post('/parcial', ventaParcialDTO).then(r => r.data);

export const registrarVentasParcialFachada = ventaParcialDTO =>
  registrarVentasParcial(ventaParcialDTO);

const obtenerVentasPorCuadreCaja = async (idCuadreCaja) => {
  return apiClient.get(`/cuadre-caja/${idCuadreCaja}`).then(r => r.data);
};

export const obtenerVentasPorCuadreCajaFachada = async (idCuadreCaja) => {
  return await obtenerVentasPorCuadreCaja(idCuadreCaja);
};

const obtenerVentaPorNumeroReferenciaYNegocio = async (numeroReferencia) => {
  return apiClient.get(`/detalle/${numeroReferencia}`).then(r => r.data);
};

export const obtenerVentaPorNumeroReferenciaYNegocioFachada = async (numeroReferencia) => {
  return await obtenerVentaPorNumeroReferenciaYNegocio(numeroReferencia);
};

const buscarVentas = async (numeroReferencia, fechaInicio, fechaFin, username) => {
  return apiClient.get('/buscar', {
    params: {
      numeroReferencia,
      fechaInicio,
      fechaFin,
      username
    }
  }).then(r => r.data);
};

export const buscarVentasFachada = async (numeroReferencia, fechaInicio, fechaFin, username) => {
  return await buscarVentas(numeroReferencia, fechaInicio, fechaFin, username);
};



const obtenerProductosMasVendidos = async (fechaInicio, fechaFin, limite) => {
  return apiClient.get('/mas-vendidos', {
    params: {
      fechaInicio,
      fechaFin,
      limite
    }
  }).then(r => r.data);
};

export const obtenerProductosMasVendidosFachada = async (fechaInicio, fechaFin, limite = 10) => {
  return await obtenerProductosMasVendidos(fechaInicio, fechaFin, limite);
};

