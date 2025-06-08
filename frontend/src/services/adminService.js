// src/api/services/adminService.js
import apiClient from "./apiClient";

// 🔐 Admin Auth/Info
export const getAdminProfile = () => apiClient.get('/admin/profile');
export const getDashboardStats = () => apiClient.get('/admin/dashboard/stats');

// 👥 Users
export const getAllUsers = () => apiClient.get('/admin/users');
export const getUserById = (id) => apiClient.get(`/admin/users/${id}`);
export const updateUser = (id, data) => apiClient.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/admin/users/${id}`);

// 🏠 Rooms
export const getAllRoomsAdmin = () => apiClient.get('/admin/rooms');
export const createRoomAdmin = (data) => apiClient.post('/admin/rooms', data);
export const updateRoomAdmin = (id, data) => apiClient.put(`/admin/rooms/${id}`, data);
export const deleteRoomAdmin = (id) => apiClient.delete(`/admin/rooms/${id}`);

// 🧾 Invoices
export const getAllInvoices = () => apiClient.get('/admin/invoices');
export const createInvoice = (data) => apiClient.post('/admin/invoices', data);
export const updateInvoice = (id, data) => apiClient.put(`/admin/invoices/${id}`, data);
export const deleteInvoice = (id) => apiClient.delete(`/admin/invoices/${id}`);

// 🧰 Complaints
export const getAllComplaints = () => apiClient.get('/admin/complaints');
export const resolveComplaint = (id) => apiClient.patch(`/admin/complaints/${id}/resolve`);

// 💬 Suggestions
export const getAllSuggestionsAdmin = () => apiClient.get('/admin/suggestions');
export const deleteSuggestionAdmin = (id) => apiClient.delete(`/admin/suggestions/${id}`);