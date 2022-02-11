import axiosClient from './axiosClient';

const authApi = {
  login: (data) => {
    const url = 'account/login';
    return axiosClient.post(url, {
      Username: data.emailorphone,
      Password: data.password,
    });
  },

  loginWithGoogle: (tokenId) => {
    const url = 'account/login-by-google';
    return axiosClient.post(url, {
      token: tokenId,
    });
  },

  refreshToken: (refreshToken) => {
    return axiosClient.post('auth/refresh-token', {
      refreshToken,
    });
  },
};

export default authApi;