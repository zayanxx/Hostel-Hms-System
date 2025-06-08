const BASE_URL = import.meta.env.VITE_API_URL || 'https://hostelhms.onrender.com/api';

export const ENDPOINTS = {
  AUTH: `${BASE_URL}/auth`,
  ADMIN: `${BASE_URL}/admin`,
  ROOMS: `${BASE_URL}/rooms`,
  SUGGESTIONS: `${BASE_URL}/suggestions`,
  COMPLAINTS: `${BASE_URL}/complaints`,
  INVOICES: `${BASE_URL}/invoices`,
  RESIDENTS: `${BASE_URL}/residents`,
};