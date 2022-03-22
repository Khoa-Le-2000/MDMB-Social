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
  getPartnerAccountInfor: (accountId) => {
    const url = `/account/account-information?accountId=${accountId}`;
    return axiosClient.get(url);
  },
  search: (SearchKey,AccountId) => {
    const url = `/account/account-list-searching?SearchKey=${SearchKey}&AccountId=${AccountId}`;
    return axiosClient.get(url);
  },
    addfriend: (RelatingAccountId, RelatedAccountId, Type) => {
    const url = `/account/insert-relationship?RelatingAccountId=${RelatingAccountId}&RelatedAccountId=${RelatedAccountId}&Type=${Type}`;
    return axiosClient.get(url);
  },
  listRelationship: (AccountId) => {
    const url = `/account/list-have-relationship?AccountId=${AccountId}`;
    return axiosClient.get(url);
  }

};

export default userApi;
