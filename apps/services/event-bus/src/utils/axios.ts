// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = '' // e.g., from localStorage or cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
