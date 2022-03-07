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

export const selectRoom = (conversation) => async (dispatch) => {
  dispatch(SelectRoomStart());
  const { Avatar, Name, AccountId } = conversation;
  dispatch(SelectRoomSuccess({ Avatar, Name, AccountId }));
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

export const getMessagesLatest =
  (myAccountId, yourAccountId) => async (dispatch) => {
    dispatch(getListMessageLatestStart());
    const data = await chatApi.getListMessage(myAccountId, yourAccountId);
    if (data?.message === 'No message found') {
      dispatch(getListMessageLatestSuccess([]));
    } else {
      dispatch(getListMessageLatestSuccess(data));
    }
  };

const sendMessageStart = () => {
  return {
    type: ChatActionTypes.SEND_MESSAGE_START,
  };
};

const sendMessageSuccess = (message) => {
  return {
    type: ChatActionTypes.SEND_MESSAGE_SUCCESS,
    payload: message,
  };
};

const sendMessageFailure = (error) => {
  return {
    type: ChatActionTypes.SEND_MESSAGE_FAILURE,
    payload: error,
  };
};

export const sendMessage = (message) => async (dispatch) => {
  dispatch(sendMessageStart());
  dispatch(sendMessageSuccess(message));
};

const receiveMessageStart = () => {
  return {
    type: ChatActionTypes.RECEIVE_MESSAGE_START,
  };
};

export const receiveMessage = (message) => async (dispatch) => {
  dispatch(receiveMessageStart());
  dispatch(sendMessageSuccess(message));
};
