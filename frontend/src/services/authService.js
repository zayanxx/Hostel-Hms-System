import apiClient from './apiClient';

export const login = (credentials) => apiClient.post('/auth/login', credentials);
export const register = (data) => apiClient.post('/auth/register', data);
export const logout = () => apiClient.post('/auth/logout');
export const getProfile = () => apiClient.get('/auth/profile');
