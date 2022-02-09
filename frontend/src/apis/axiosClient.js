import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://13.250.46.59:8080/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    throw error;
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
