import conversationsReducer from 'features/ChatOverView/ChatConversations/ChatConversationSlice';
import chatReducer from 'features/ChatOverView/ChatSlice';
import socketReducer from 'features/ChatOverView/SocketSlice';
import loginReducer from 'features/Login/LoginSlice';
import registerReducer from 'features/Register/RegisterSlice';
import previewLinkReducer from 'features/ChatOverView/ChatWindow/WindowContent/Messages/CardMessage/CardLinkSlice.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  conversations: conversationsReducer,
  chat: chatReducer,
  socket: socketReducer,
  previewLink:previewLinkReducer,
});

export default rootReducer;
