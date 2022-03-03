import chatApi from 'apis/chatApi';
import { ChatActionTypes } from 'app/actions/types/chatTypes';

export const getListMessageLatestStart = () => {
  return {
    type: ChatActionTypes.LIST_MESSAGE_LATEST_START,
  };
};

export const getListMessageLatestSuccess = (listMessage) => {
  return {
    type: ChatActionTypes.LIST_MESSAGE_LATEST_SUCCESS,
    payload: listMessage,
  };
};

export const getListMessageLatestFailure = (message) => {
  return {
    type: ChatActionTypes.LIST_MESSAGE_LATEST_FAILURE,
    payload: message,
  };
};

export const getMessagesLatest =
  (myAccountId, yourAccountId) => async (dispatch) => {
    const data = await chatApi.getListMessage(myAccountId, yourAccountId);
    console.log('🚀 :: file: chat.js :: line 26 :: data', data);
  };
