import axios from "axios";

const API = axios.create({
<<<<<<< HEAD:frontend/src/api/axios.tsx
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000",
=======
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
>>>>>>> 347ee8f653c4e5415a11deb7caa459dedb9593c0:frontend/src/api/axios.ts
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
