import { logout, refreshToken } from 'app/actions/login';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
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
      const user = store?.getState()?.auth?.token;

      if (!config.headers.Authorization && user) {
        config.headers.Authorization = `${user.accessToken}`;
      }

      if (user?.accessToken && user?.refreshToken) {
        const { exp: decodedAT } = jwt_decode(user.accessToken);
        const { exp: decodedRT } = jwt_decode(user.refreshToken);

        var currentTime = new Date().getTime() / 1000;
        let isExpiredAT = currentTime > decodedAT;
        let isExpiredRT = currentTime > decodedRT;

        if (isExpiredAT && !isExpiredRT) {
          console.log('Refresh token start');
          await store.dispatch(refreshToken(user?.refreshToken));
          console.log('Refresh token success');
          if (config?.headers) {
            config.headers.Authorization =
              store?.getState()?.authReducer?.token?.accessToken;
          }
        } else if (isExpiredAT && isExpiredRT) {
          store.dispatch(logout());
        }
        console.log('After: ', isExpiredAT, isExpiredRT);
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
      return Promise.reject(error);
    }
  );
};

export default axiosClient;
