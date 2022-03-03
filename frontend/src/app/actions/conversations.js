import conversationApi from 'apis/conversationApi';
import { ConversationActionTypes } from 'app/actions/types/conversationTypes';

export const getListConversationStart = () => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_START,
  };
};

export const getListConversationSuccess = (listConversation) => {
  return {
    type: ConversationActionTypes.GET_LIST_CONVERSATION_SUCCESS,
    payload: listConversation,
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
  if (data?.result[0]) {
    dispatch(
      getListConversationSuccess({
        listConversation: data?.result[0],
      })
    );
  } else {
    dispatch(getListConversationFailure('Cannot get list conversation!'));
  }
};
