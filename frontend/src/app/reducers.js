import { AuthActionTypes } from 'app/actions/types/authTypes';
import conversationsReducer from 'features/ChatOverView/ChatConversations/ChatConversationSlice';
import chatReducer from 'features/ChatOverView/ChatSlice';
import socketReducer from 'features/ChatOverView/SocketSlice';
import loginReducer from 'features/Login/LoginSlice';
import registerReducer from 'features/Register/RegisterSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  conversations: conversationsReducer,
  chat: chatReducer,
  socket: socketReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthActionTypes.LOGOUT_SUCCESS) {
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
export default rootReducer;
