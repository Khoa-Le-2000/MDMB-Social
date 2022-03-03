import { ChatActionTypes } from 'app/actions/types/chatTypes';

const initialState = {
  isFetching: false,
  error: false,
  success: false,
  message: null,
  listConversation: [],
  listFriend: [],
  room: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChatActionTypes.GET_LIST_FRIEND_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false,
        message: null,
      };
    case ChatActionTypes.GET_LIST_FRIEND_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        message: null,
        listFriend: action.payload.listFriend,
      };
    case ChatActionTypes.GET_LIST_FRIEND_FAILURE:
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

export default chatReducer;
