import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 

export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const logout = () => {
  // Optionally clear localStorage, session, or notify backend
  localStorage.removeItem('user');
};

export const resetPassword = async (email: string) => {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to reset password');
    }
  
    return await response.json();
  };