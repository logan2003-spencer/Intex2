// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://intex-backend-4logan-g8agdge9hsc2aqep.westus-01.azurewebsites.net/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
