import apiClient from "./apiClient";
export const createSuggestion = (content) => apiClient.post('/suggestions', { content });
export const getSuggestions = () => apiClient.get('/suggestions');
export const getSuggestionById = (id) => apiClient.get(`/suggestions/${id}`);
export const updateSuggestion = (id, content) => apiClient.put(`/suggestions/${id}`, { content });
export const deleteSuggestion = (id) => apiClient.delete(`/suggestions/${id}`);