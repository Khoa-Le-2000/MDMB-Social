import conversationApi from 'apis/conversationApi';
import { ConversationActionTypes } from 'app/actions/types/conversationTypes';

export const getListConversationStart = () => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_START,
  };
};

export const getListConversationSuccess = (payload) => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_SUCCESS,
  };
};

export const getListConversationFailure = (message) => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_FAILURE,
    payload: message,
  };
};

export const getListConversation = (myAccountId) => async (dispatch) => {
  dispatch(getListConversationStart());
  const data = await conversationApi.getListConversation(myAccountId);
  if (data?.listConversation) {
    dispatch(getListConversationSuccess(data));
  } else {
    dispatch(getListConversationFailure('Cannot get list conversation!'));
  }
};
