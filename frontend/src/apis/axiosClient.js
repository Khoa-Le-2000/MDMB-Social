import { refreshToken } from 'app/actions/login';
import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const interceptor = (store) => {
  axiosClient.interceptors.request.use(
    async (config) => {
      const auth = store?.getState()?.login?.auth;
      debugger;

      if (!config.headers['Authorization'] && auth?.accessToken) {
        config.headers['Authorization'] = auth?.accessToken;
      }
      return config;
    },
    (error) => {
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
      if (error.response.status === 401) {
        const rt = store?.getState()?.login?.auth?.refreshToken;
        if (refreshToken) {
          store.dispatch(refreshToken(rt));
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosClient;
