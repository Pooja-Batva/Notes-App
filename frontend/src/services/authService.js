import api from './api';

const AUTH_API = "users/auth";

export const signup = (data) => api.post(`${AUTH_API}/signup`, data);
export const login = (data) => api.post(`${AUTH_API}/login`, data);