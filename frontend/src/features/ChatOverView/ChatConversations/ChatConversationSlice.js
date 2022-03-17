import { ConversationActionTypes } from 'app/actions/types/conversationTypes';

const initialState = {
  isFetching: false,
  error: false,
  success: false,
  message: null,
  listConversation: [],
};
const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ConversationActionTypes.GET_LIST_CONVERSATION_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false,
        message: null,
      };
    case ConversationActionTypes.GET_LIST_CONVERSATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        message: null,
        listConversation: action.payload,
      };
    case ConversationActionTypes.GET_LIST_CONVERSATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        success: false,
        message: action.payload.message,
      };

    case ConversationActionTypes.UPDATE_MESSAGE_UNREAD_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false,
        message: null,
      };
    case ConversationActionTypes.UPDATE_MESSAGE_UNREAD_SUCCESS:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false,
        message: null,
        listConversation: action.payload,
      };
    case ConversationActionTypes.UPDATE_LIST_CONVERSATION_WITH_NEW_MESSAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        message: null,
        listConversation: action.payload,
      };

    default:
      return state;
  }
};

export default conversationsReducer;
