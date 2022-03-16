import axiosClient from "apis/axiosClient";

const userApi = {
  updateProfile: (data) => {
    const url = 'account/update';
    return axiosClient.post(url, {
      Email: data.Email,
      Avatar: data.Avatar,
      Gender: data.Gender,
      Birthday: data.Birthday,
      Name: data.Name,
    });
  },
  getAccountInfor: (accountId) => {
    const url = `/account/account-information?accountId=${accountId}`;
    return axiosClient.get(url);
  },

};

export default userApi;
