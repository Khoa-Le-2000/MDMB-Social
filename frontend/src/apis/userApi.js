import axiosClient from "apis/axiosClient";

const userApi = {
  updateProfile: async (data) => {
    const url = 'account/update-profile';
    return axiosClient.post(url, {
      Email: data.email.trim().toLowerCase(),
      Avatar: data.avatar,
      Gender: data.gender,
      Birthday: data.birthday,
    });
  },
  getAccountInfor: async (accountId) => {
    const url = `/account/account-information?accountId=${accountId}`;
    return axiosClient.get(url);
  },
};

export default userApi;
