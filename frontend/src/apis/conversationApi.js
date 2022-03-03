import axiosClient from 'apis/axiosClient';

const conversationApi = {
  getListConversation: async (accountId) => {
    const url = `/account/list-friend-with-last-message?accountId=${accountId}`;
    return axiosClient.get(url);
  },
};

export default conversationApi;
