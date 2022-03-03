import { ChatActionTypes } from 'app/actions/types/chatActionTypes';

const initialState = {
  isFetching: false,
  error: false,
  success: false,
  message: null,
  listFriend: [],
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
