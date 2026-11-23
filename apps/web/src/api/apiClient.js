import axios from 'axios';

const apiClient = axios.create({ baseURL: '/api' });

// Unwrap { success, message, data } and surface the server's message on errors.
apiClient.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(new Error(error.response?.data?.message || error.message))
);

export default apiClient;
