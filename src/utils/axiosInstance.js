// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.58.166.104:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['authorization'] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(error);
    if (error.response.status === 401) {
        const response = await axiosInstance.post('/auth/refresh-token', {refreshToken,});
        localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
