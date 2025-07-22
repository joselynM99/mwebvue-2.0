import jwtDecode from 'jwt-decode';

const API_URL = process.env.VUE_APP_API_URL;

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (error) {
    console.error('Error al decodificar token:', error);
    return true; // Considera expirado si hay error
  }
}


export default {
  login(email, password) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || 'Credenciales incorrectas');
        }
        return response.json();
      })
      .then(data => {
        const { token, email, roles, estado } = data.usuario;

        if (!estado) {
          throw new Error('El usuario está inactivo. Contacte al administrador.');
        }

        const rol = roles[0];

        localStorage.setItem('jwt', token);
        localStorage.setItem('usuario', JSON.stringify({
          email,
          rol,
        }));
        return data.usuario;
      });
  },

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('usuario');
  },

  getToken() {
    return localStorage.getItem('jwt');
  },

  isAuthenticated() {
    const token = localStorage.getItem('jwt');
    if (!token) return false;

    return !isTokenExpired(token);
  }
};
