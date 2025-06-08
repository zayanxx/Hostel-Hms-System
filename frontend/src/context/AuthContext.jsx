/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage safely
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);       // For UI feedback during login/register
  const [error, setError] = useState(null);            // To expose error messages to UI

  // Setup axios default header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Setup interceptor to auto logout on 401 Unauthorized errors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      res => res,
      err => {
        if (err.response?.status === 401) {
          logout(); // auto logout on token expiry or invalid token
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Save user/token to state and localStorage
  const saveAuth = useCallback((userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  }, []);

  // Login method with loading/error handling
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`https://hostelhms.onrender.com/api/auth/login`, { email, password });
      const { user: userData, token: tokenData } = res.data;

      if (!userData || !tokenData) throw new Error('Invalid server response');

      saveAuth(userData, tokenData);

      return userData;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [saveAuth]);

  // Register method: supports extended user info
  // Accepts an object with any registration fields (flexible)
  const register = useCallback(async (registrationData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`https://hostelhms.onrender.com/api/auth/register`, registrationData);
      const { user: userData, token: tokenData } = res.data;

      if (!userData || !tokenData) throw new Error('Invalid server response');

      saveAuth(userData, tokenData);

      return userData;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [saveAuth]);

  // Logout clears all user data from state and localStorage
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  // Memoize context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
  }), [user, token, loading, error, login, register, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);
