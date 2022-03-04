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
    case ConversationActionTypes.LIST_CONVERSATION_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false,
        message: null,
      };
    case ConversationActionTypes.LIST_CONVERSATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        message: null,
        listConversation: action.payload.listConversation,
      };
    case ConversationActionTypes.LIST_CONVERSATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        success: false,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default conversationsReducer;
