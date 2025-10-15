import axios from 'axios';

const API = axios.create({
  baseURL: 'https://project-virtugrow-api.onrender.com/' + '/api', // backend url
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to each request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;