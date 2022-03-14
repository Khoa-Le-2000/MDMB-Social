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
 
};

export default userApi;
