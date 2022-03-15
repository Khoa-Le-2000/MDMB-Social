import { SocketActionTypes } from 'app/actions/types/socketTypes';

const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SocketActionTypes.INIT_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case SocketActionTypes.CLOSE_SOCKET:
      return {
        ...state,
        socket: null,
      };
    default:
      return state;
  }
};

export default socketReducer;
