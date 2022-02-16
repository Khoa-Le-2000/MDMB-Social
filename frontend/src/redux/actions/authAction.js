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
    payload: message.result,
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
  console.log('🚀 :: login :: data', data);

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
    dispatch(
      loginFailure({
        result: 'Tài khoản hoặc mật khẩu không chinh xác',
      })
    );
  }
};

export const loginByGoogle = (tokenId) => async (dispatch) => {
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
  } else {
    const { result } = data;
    dispatch(loginFailure(result));
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
