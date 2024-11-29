import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/login/`, { email, password });
  if (response.data.token) {
    return response.data.token;
  }
  throw new Error('Login failed');
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  await axios.post(`${API_URL}/register/`, userData);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};