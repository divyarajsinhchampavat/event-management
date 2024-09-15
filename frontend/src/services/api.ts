import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Your backend base URL
});

export default api;
