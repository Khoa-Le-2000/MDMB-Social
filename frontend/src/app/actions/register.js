import authApi from 'apis/authApi';
import { AuthActionTypes } from 'app/actions/types/authActionTypes';

export const resetRegister = () => {
  return {
    type: AuthActionTypes.RESET_REGISTER,
  };
};

export const registerStart = () => {
  return {
    type: AuthActionTypes.REGISTER_START,
  };
};

export const registerFailure = (message) => {
  return {
    type: AuthActionTypes.REGISTER_FAILURE,
    payload: message,
  };
};

export const registerSuccess = (data) => {
  return {
    type: AuthActionTypes.REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerUser = (user, navigate) => async (dispatch) => {
  dispatch(registerStart());

  let data = null;
  if (user?.google) {
    data = await authApi.registerByGoogle(user);
  } else {
    data = await authApi.register(user);
  }

  if (data?.result === 'register successful') {
    dispatch(
      registerSuccess({
        message: 'Register successful. Please login!',
        type: user?.google ? 'google' : 'local',
      })
    );
  } else if (data?.result === 'email sent successful') {
    dispatch(
      registerSuccess({
        message: `We just sent an email to ${user.email} to activate your account.`,
        type: user?.google ? 'google' : 'local',
      })
    );
  } else {
    dispatch(registerFailure('Email is already in use'));
  }
};
