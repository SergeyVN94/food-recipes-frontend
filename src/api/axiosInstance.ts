import axios from 'axios';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 90000,
  responseType: 'json',
  withCredentials: false,
  headers: { 'Content-Type': 'multipart/form-data' },
});

export default api;
