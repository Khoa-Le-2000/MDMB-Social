import axios from 'axios';
import jwt_decode from 'jwt-decode';
import queryString from 'query-string';
import { logoutStart, refreshToken } from 'redux/actions/authAction';

const axiosClient = axios.create({
  baseURL: 'http://13.250.46.59:8080/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const interceptor = (store) => {
  axios.interceptors.request.use(
    async (config) => {
      const user = store?.getState()?.authReducer?.login?.token;

      if (!config.headers['Authorization'] && user) {
        config.headers['x-access-token'] = `${user.accessToken}`;
      }

      if (user?.accessToken && user?.refreshToken) {
        const { exp: decodedAT } = jwt_decode(user.accessToken);
        const { exp: decodedRT } = jwt_decode(user.refreshToken);

        var currentTime = new Date().getTime() / 1000;
        let isExpiredAT = currentTime > decodedAT;
        let isExpiredRT = currentTime < decodedRT;
        console.log('Before: ', isExpiredAT, isExpiredRT);

        if (isExpiredAT && !isExpiredRT) {
          console.log('Refresh token success');
          await store.dispatch(refreshToken(user?.refreshToken));
          if (config?.headers) {
            config.headers['authorization'] =
              store?.getState()?.authReducer?.token?.accessToken;
          }
        } else if (isExpiredAT && !isExpiredRT) {
          store.dispatch(logoutStart());
        }
        console.log('After: ', isExpiredAT, isExpiredRT);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default axiosClient;
