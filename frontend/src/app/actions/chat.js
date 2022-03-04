import chatApi from 'apis/chatApi';
import { ChatActionTypes } from 'app/actions/types/chatTypes';

const SelectRoomStart = () => {
  return {
    type: ChatActionTypes.SELECT_ROOM_START,
  };
};
const SelectRoomSuccess = (partner) => {
  return {
    type: ChatActionTypes.SELECT_ROOM_SUCCESS,
    payload: partner,
  };
};

export const selectRoom =
  (accountId, conversation, navigate) => async (dispatch) => {
    dispatch(SelectRoomStart());
    const { Avatar, Name, AccountId } = conversation;
    dispatch(SelectRoomSuccess({ Avatar, Name, AccountId }));
    dispatch(getMessagesLatest(accountId, conversation.AccountId, navigate));
  };

const getListMessageLatestStart = () => {
  return {
    type: ChatActionTypes.LIST_MESSAGE_LATEST_START,
  };
};

const getListMessageLatestSuccess = (listMessage) => {
  return {
    type: ChatActionTypes.LIST_MESSAGE_LATEST_SUCCESS,
    payload: listMessage,
  };
};

const getListMessageLatestFailure = (message) => {
  return {
    type: ChatActionTypes.LIST_MESSAGE_LATEST_FAILURE,
    payload: message,
  };
};

export const getMessagesLatest =
  (myAccountId, yourAccountId, navigate) => async (dispatch) => {
    dispatch(getListMessageLatestStart());
    const data = await chatApi.getListMessage(myAccountId, yourAccountId);
    console.log('🚀 :: file: chat.js :: line 46 :: data', data);
    if (data?.message === 'No message found') {
      dispatch(getListMessageLatestSuccess([]));
      navigate(`/chat/${yourAccountId}`);
    } else {
      dispatch(getListMessageLatestSuccess(data));
      navigate(`/chat/${yourAccountId}`);
    }
  };
