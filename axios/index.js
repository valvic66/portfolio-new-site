import axios from 'axios';

const { API_SERVER_URL } = process.env;

export const client = axios.create({
  baseURL: API_SERVER_URL,
  timeout: 1000,
});
