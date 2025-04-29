// src/api/axiosInstance.js

import axios from 'axios';

// Detect port jika ada, contoh untuk localhost:3000
const port = window.location.port ? `:${window.location.port}` : '';

const baseURL = `${window.location.protocol}//${window.location.hostname}${port}/api`;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
