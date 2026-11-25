import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ceylongig_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ceylongig_token');
      localStorage.removeItem('ceylongig_user');
      window.dispatchEvent(new Event('ceylongig:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
