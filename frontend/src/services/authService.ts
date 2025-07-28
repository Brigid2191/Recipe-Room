import axios from '../api/axios';

const API_URL = 'http://localhost:5000/api/auth';

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const login = async (
  credentials: { email: string; password: string }
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  const data = response.data;
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const register = async (
  userData: { username: string; email: string; password: string }
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  const data = response.data;
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const resetPassword = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
};
