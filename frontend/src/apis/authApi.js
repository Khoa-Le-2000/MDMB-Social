import axiosClient from './axiosClient';

const authApi = {
  login: (data) => {
    console.log('data: ', data);
    const url = 'account/login';
    return axiosClient.post(url, {
      Username: data.emailorphone,
      Password: data.password,
    });
  },
};

export default authApi;
