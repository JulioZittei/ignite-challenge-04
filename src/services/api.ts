import axios from 'axios';

const env =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://ignite-challenge-04.netlify.app/api';

const api = axios.create({
  baseURL: `${env}`,
});

export default api;
