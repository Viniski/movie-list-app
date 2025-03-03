import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: 'pl-PL',
  },
});

export default tmdbApi;
