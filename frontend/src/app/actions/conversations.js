import conversationApi from 'apis/conversationApi';
import { ConversationActionTypes } from 'app/actions/types/conversationTypes';

const getListConversationStart = () => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_START,
  };
};

const getListConversationSuccess = (listConversation) => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_SUCCESS,
    payload: listConversation,
  };
};

const getListConversationFailure = (message) => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_FAILURE,
    payload: message,
  };
};

export const getListConversation = (myAccountId) => async (dispatch) => {
  dispatch(getListConversationStart());
  const data = await conversationApi.getListConversation(myAccountId);
  if (data?.result) {
    dispatch(getListConversationSuccess(data?.result));
  } else {
    dispatch(getListConversationFailure('Cannot get list conversation!'));
  }
};

export const refreshListConversation = () => {
  return {
    type: ConversationActionTypes.REFRESH_LIST_CONVERSATION,
  };
};
