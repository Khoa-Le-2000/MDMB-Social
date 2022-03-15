import { SocketActionTypes } from 'app/actions/types/socketTypes';
import io from 'socket.io-client';

export const initSocket = (accountId, accessToken) => (dispatch) => {
  const socket = io(process.env.REACT_APP_API_URL, {
    transports: ['websocket'],
    auth: { token: accessToken },
    query: { accountId },
  });
  if (socket) {
    dispatch({
      type: SocketActionTypes.INIT_SOCKET,
      payload: socket,
    });
  }
};

export const connectSocket = () => {
  return {
    type: SocketActionTypes.SOCKET_CONNECT,
  };
};

export const disconnectSocket = () => {
  return {
    type: SocketActionTypes.SOCKET_DISCONNECT,
  };
};
