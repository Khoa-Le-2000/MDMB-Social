import axiosClient from './axiosClient';

const authApi = {
  register: async (data) => {
    const url = 'account/register';
    return axiosClient.post(url, {
      Email: data.email.trim().toLowerCase(),
      Password: data.password,
      Name: data.name,
      Phone: data.phone,
    });
  },

  updateProfile: async (data) => {
    const url = 'account/update-profile';
    return axiosClient.post(url, {
      Email: data.email.trim().toLowerCase(),
      Avatar: data.avatar,
      Gender: data.gender,
      Birthday: data.birthday,
    });
  },

  login: (data) => {
    const url = 'account/login';
    return axiosClient.post(url, {
      Username: data.emailorphone.trim().toLowerCase(),
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
