import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if backend uses cookies/session
  timeout: 10000,
});

// Attach token to every request if exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor for 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login on unauthorized
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// API methods
export const loginApi = (credentials) => apiClient.post('/auth/login', credentials);
export const registerApi = (data) => apiClient.post('/auth/register', data);
export const logoutApi = () => apiClient.post('/auth/logout');
export const getProfileApi = () => apiClient.get('/auth/me');
