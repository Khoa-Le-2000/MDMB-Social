import axiosClient from 'apis/axiosClient';

const conversationApi = {
  getListConversation: async (accountId) => {
    const url = `/chat/chat-list?accountId=${accountId}`;
    return axiosClient.get(url);
  },
};

export default conversationApi;
