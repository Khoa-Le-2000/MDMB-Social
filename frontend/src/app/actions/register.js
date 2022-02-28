import authApi from 'apis/authApi';
import { AuthActionTypes } from 'app/actions/types/authActionTypes';

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

export const registerSuccess = (message) => {
  return {
    type: AuthActionTypes.REGISTER_SUCCESS,
    payload: message,
  };
};

export const registerUser = (user) => async (dispatch) => {
  dispatch(registerStart());
  let data = null;
  if (user?.google) {
    data = await authApi.registerByGoogle(user);
  } else {
    data = await authApi.register(user);
  }

  if (
    data?.result === 'email sent succesful' ||
    data?.result === 'email sent successfully'
  ) {
    dispatch(
      registerSuccess(
        `We just sent an email to ${user.email} to activate your account.`
      )
    );
  } else {
    dispatch(registerFailure('Email is already in use'));
  }
};
