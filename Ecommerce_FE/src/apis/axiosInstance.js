import axios from 'axios';

const API_ROOT = 'http://localhost:8000/api';

export const axiosInstance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
});
