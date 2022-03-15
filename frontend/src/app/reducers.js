import conversationsReducer from 'features/ChatOverView/ChatConversations/ChatConversationSlice';
import chatReducer from 'features/ChatOverView/ChatSlice';
import loginReducer from 'features/Login/LoginSlice';
import registerReducer from 'features/Register/RegisterSlice';
import { combineReducers } from 'redux';
import userProfileReducer from 'features/UpdateProfile/GetUserProfileSlice'
import updateProfileReducer from 'features/UpdateProfile/UpdateProfileSlice'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  conversations: conversationsReducer,
  chat: chatReducer,
  userProfile:userProfileReducer,
  updateProfile:updateProfileReducer
});

export default rootReducer;
