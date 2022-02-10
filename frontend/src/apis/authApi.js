import axiosClient from './axiosClient';

const authApi = {
  login: (data) => {
    const url = 'account/login';
    return axiosClient.post(url, {
      Username: data.emailorphone,
      Password: data.password,
    });
  },
  refreshToken: (refreshToken) => {
    return axiosClient.post('auth/refresh-token', {
      refreshToken,
    });
  },
};

export default authApi;
