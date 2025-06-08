import apiClient from "./apiClient";

export const getInvoices = () => apiClient.get('/invoices');
export const getInvoiceById = (id) => apiClient.get(`/invoices/${id}`);
export const createInvoice = (data) => apiClient.post('/invoices', data);
export const updateInvoice = (id, data) => apiClient.put(`/invoices/${id}`, data);
export const deleteInvoice = (id) => apiClient.delete(`/invoices/${id}`);
