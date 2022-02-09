import authApi from 'apis/authApi';
import { AuthActionTypes } from './types/authActionTypes';

export const loginSuccess = (token) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: token,
  };
};

export const login =
  ({ emailorphone, password }) =>
  async (dispatch) => {
    const { accessToken, refreshToken } = await authApi.login({
      emailorphone,
      password,
    });

    dispatch(loginSuccess({ accessToken, refreshToken }));
  };

export const logout = () => {
  return {
    type: AuthActionTypes.LOGOUT,
  };
};
