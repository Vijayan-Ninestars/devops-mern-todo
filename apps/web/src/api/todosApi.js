import apiClient from './apiClient';

export const todosApi = {
	list: () => apiClient.get('/todos').then((r) => r.data),
	create: (payload) => apiClient.post('/todos', payload).then((r) => r.data),
	update: (id, payload) => apiClient.put(`/todos/${id}`, payload).then((r) => r.data),
	toggle: (id) => apiClient.patch(`/todos/${id}/toggle`).then((r) => r.data),
	remove: (id) => apiClient.delete(`/todos/${id}`).then((r) => r.data),
};
