// src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = (user) => axios.post(`${API_URL}/register`, user);
export const login = (user) => axios.post(`${API_URL}/login`, user);
export const createTask = (task, token) => axios.post(`${API_URL}/tasks`, task, {
  headers: { 'x-access-token': token },
});
export const fetchTasks = (token) => axios.get(`${API_URL}/tasks`, {
  headers: { 'x-access-token': token },
});
export const updateTask = (id, task, token) => axios.put(`${API_URL}/tasks/${id}`, task, {
  headers: { 'x-access-token': token },
});
export const deleteTask = (id, token) => axios.delete(`${API_URL}/tasks/${id}`, {
  headers: { 'x-access-token': token },
});
