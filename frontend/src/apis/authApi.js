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

  loginWithFacebook: (tokenId) => {
    const url = `account/login-by-facebook/user?=${tokenId}`;
    return axiosClient.get(url);
  },

  refreshToken: (refreshToken) => {
    return axiosClient.post('auth/refresh-token', {
      refreshToken,
    });
  },
  verifyCaptcha: (response) => {
    const url = `auth/captcha?captcha=${response}`;
    return axiosClient.get(url);
  },
};

export default authApi;
