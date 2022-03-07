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
