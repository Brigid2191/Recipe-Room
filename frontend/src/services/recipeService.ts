import axios from '../api/axios';

const API_URL = '/api/auth';

export const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

export const signup = async (userData: { username: string; password: string; image_url?: string; bio?: string }) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
