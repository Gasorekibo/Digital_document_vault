import axios from 'axios';
import baseURL from './baseUrl';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export default axiosInstance;
