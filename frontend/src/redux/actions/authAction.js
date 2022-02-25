import authApi from 'apis/authApi';
import { AuthActionTypes } from './types/authActionTypes';

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
  const data = await authApi.register(user);

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

export const resetLoginError = () => {
  return {
    type: AuthActionTypes.RESET_LOGIN_ERROR,
  };
};

export const loginStart = () => {
  return {
    type: AuthActionTypes.LOGIN_START,
  };
};

export const loginFailure = (message) => {
  return {
    type: AuthActionTypes.LOGIN_FAILURE,
    payload: message,
  };
};

export const loginSuccess = (token) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    },
  };
};

export const login = (user) => async (dispatch) => {
  dispatch(loginStart());

  const { emailorphone, password } = user;

  const data = await authApi.login({
    emailorphone,
    password,
  });
  if (data?.accessToken && data?.refreshToken) {
    const { accessToken, refreshToken } = data;
    dispatch(
      loginSuccess({
        accessToken,
        refreshToken,
      })
    );
  } else {
    // const { result } = data;
    dispatch(loginFailure('Wrong email or password!'));
  }
};

export const loginByGoogle = (tokenId, navigate) => async (dispatch) => {
  dispatch(loginStart());

  const data = await authApi.loginWithGoogle(tokenId);

  if (data?.accessToken && data?.refreshToken) {
    const { accessToken, refreshToken } = data;
    dispatch(
      loginSuccess({
        accessToken,
        refreshToken,
      })
    );
  } else if (data?.result === 'login failure') {
    dispatch(redirectToRegister());
    navigate('register/google');
  } else {
    dispatch(loginFailure(`Can't sign in to your Google Account`));
  }
};

export const refreshToken = (refreshToken) => async (dispatch) => {
  const data = await authApi.refreshToken(refreshToken);
  if (data?.accessToken) {
    const { accessToken } = data;
    dispatch(refreshTokenSuccess(accessToken));
  }
};

export const refreshTokenSuccess = (token) => {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_SUCCESS,
    payload: token,
  };
};

export const logoutStart = () => {
  return {
    type: AuthActionTypes.LOGOUT_START,
  };
};

export const logoutSuccess = () => {
  return {
    type: AuthActionTypes.LOGOUT_SUCCESS,
  };
};

export const verifyCaptcha = (response) => async (dispatch) => {
  const data = await authApi.verifyCaptcha(response);
  if (data?.result === 'success') {
    dispatch(verifyCaptchaSuccess(data));
  } else {
    dispatch(verifyCaptchaFailure(data));
  }
};

export const verifyCaptchaSuccess = (data) => {
  return {
    type: AuthActionTypes.VERIFY_CAPTCHA_SUCCESS,
    payload: data,
  };
};

export const verifyCaptchaFailure = (data) => {
  return {
    type: AuthActionTypes.VERIFY_CAPTCHA_FAILURE,
    payload: data,
  };
};

export const logout = (accessToken) => async (dispatch) => {
  dispatch(logoutStart());
  // const data = await authApi.logout();
  dispatch(logoutSuccess());
};

export const redirectToLogin = () => {
  return {
    type: AuthActionTypes.REDIRECT_TO_LOGIN,
  };
};

export const redirectToRegister = () => {
  return {
    type: AuthActionTypes.REDIRECT_TO_REGISTER,
  };
};
