import authApi from 'apis/authApi';
import { AuthActionTypes } from './types/authActionTypes';

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
  const { accessToken, refreshToken } = data?.data;

  if (data.status === 200 && accessToken && refreshToken) {
    dispatch(
      loginSuccess({
        accessToken,
        refreshToken,
      })
    );
  } else {
    const message = data?.data?.message;
    dispatch(loginFailure(message));
  }
};

export const loginByGoogle = (tokenId) => async (dispatch) => {
  dispatch(loginStart());

  const data = await authApi.loginWithGoogle(tokenId);

  const { accessToken, refreshToken } = data?.data;

  if (data.status === 200 && accessToken && refreshToken) {
    dispatch(
      loginSuccess({
        accessToken,
        refreshToken,
      })
    );
  } else {
    const { result } = data?.data;
    dispatch(loginFailure({ message: result }));
  }
};

export const refreshToken = (refreshToken) => async (dispatch) => {
  const data = await authApi.refreshToken(refreshToken);
  if (data?.status === 200 && data?.data?.accessToken) {
    dispatch(refreshTokenSuccess(data.data.accessToken));
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
