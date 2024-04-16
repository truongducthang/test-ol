import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4000/api/v1'
      : 'https://tradingbotc.herokuapp.com/api/v1',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  async (config: any) => {
    // Handle token here ...
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
