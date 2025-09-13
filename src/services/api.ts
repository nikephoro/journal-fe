import axios from 'axios';
import { AuthFormData, User, JournalEntry } from '../types';

const API_BASE_URL = 'http://localhost:8086/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: async (data: AuthFormData): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  register: async (data: AuthFormData): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Journal API calls
export const journalAPI = {
  getEntries: async (): Promise<JournalEntry[]> => {
    const response = await api.get('/journal/entries');
    return response.data;
  },
  
  createEntry: async (content: string): Promise<JournalEntry> => {
    const response = await api.post('/journal/entries', { content });
    return response.data;
  },

  deleteEntry: async (id: string): Promise<void> => {
    await api.delete(`/journal/entries/${id}`);
  },

  updateEntry: async (id: string, content: string): Promise<JournalEntry> => {
    const response = await api.put(`/journal/entries/${id}`, { content });
    return response.data;
  },
};

export default api;