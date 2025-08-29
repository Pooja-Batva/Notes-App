import api from './api';

const AUTH_API = "users/auth";

export const signup = (data) => api.post(`${AUTH_API}/register`, data);
export const login = (data) => api.post(`${AUTH_API}/login`, data);
export const logout = () => api.post(`${AUTH_API}/logout`);

const authService = {
  signup,
  login,
  logout
};

export default authService;