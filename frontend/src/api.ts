// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7261/api", // Your backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
