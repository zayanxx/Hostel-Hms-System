import apiClient from "./apiClient";

export const getAllRooms = () => apiClient.get('/rooms');
export const getRoomById = (id) => apiClient.get(`/rooms/${id}`);
export const createRoom = (data) => apiClient.post('/rooms', data);
export const updateRoom = (id, data) => apiClient.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => apiClient.delete(`/rooms/${id}`);
export const allocateRoom = (id, userId) => apiClient.patch(`/rooms/${id}/allocate`, { userId });
export const getAvailableRooms = () => apiClient.get('/rooms/available');