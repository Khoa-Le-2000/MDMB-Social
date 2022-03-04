import { ChatActionTypes } from 'app/actions/types/chatTypes';

const initialState = {
  isFetching: false,
  error: false,
  success: false,
  message: null,
  listMessage: [],
  partner: {
    Avatar: null,
    Name: null,
    AccountId: null,
  },
  roomId: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChatActionTypes.SELECT_ROOM_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false,
        message: null,
      };
    case ChatActionTypes.SELECT_ROOM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        message: null,
        partner: {
          Avatar: action.payload.Avatar,
          Name: action.payload.Name,
          AccountId: action.payload.AccountId,
        },
        roomId: action.payload.AccountId,
      };
    case ChatActionTypes.LIST_MESSAGE_LATEST_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false,
        message: null,
      };
    case ChatActionTypes.LIST_MESSAGE_LATEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        message: null,
        listMessage: action.payload,
      };
    case ChatActionTypes.LIST_MESSAGE_LATEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
