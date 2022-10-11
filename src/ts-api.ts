import axios from 'axios';

const tsApi = axios.create({
  baseURL: '/api',
});

export default tsApi;
