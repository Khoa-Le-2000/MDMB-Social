import { AuthActionTypes } from '../actions/types/authActionTypes';

const initialState = {
  login: {
    token: {
      accessToken: null,
      refreshToken: null,
    },
    error: false,
    isFetching: false,
    success: false,
    message: null,
    errorCount: 0,
  },
  captcha: {
    isFetching: false,
    error: false,
    success: false,
    message: null,
  },
  register: {
    error: false,
    isFetching: false,
    success: false,
    message: null,
  },
  logout: {
    error: false,
    isFetching: false,
    success: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: true,
          error: false,
          success: false,
          message: null,
          token: null,
        },
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: false,
          error: false,
          success: true,
          message: null,
          errorCount: 0,
          token: action.payload,
        },
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: false,
          error: true,
          success: false,
          message: action.payload,
          errorCount: state.login.errorCount + 1,
          token: null,
        },
      };

    case AuthActionTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: false,
          error: false,
          success: true,
          token: action.payload,
        },
      };

    case AuthActionTypes.LOGOUT_START:
      return {
        ...state,
        logout: {
          ...state.logout,
          isFetching: true,
        },
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        logout: {
          ...state.logout,
          isFetching: false,
          error: false,
          success: true,
          errorCount: 0,
          message: null,
        },
        login: {
          ...state.login,
          token: null,
        },
      };

    case AuthActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        logout: {
          ...state.logout,
          isFetching: false,
          error: true,
          success: false,
        },
      };
    }

    case AuthActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          token: {
            ...state.login.token,
            accessToken: action.payload,
          },
        },
      };

    case AuthActionTypes.VERIFY_CAPTCHA_SUCCESS:
      return {
        ...state,
        captcha: {
          isFetching: false,
          success: true,
          message: null,
        },
      };

    case AuthActionTypes.VERIFY_CAPTCHA_FAILURE:
      return {
        ...state,
        captcha: {
          isFetching: false,
          success: false,
          message: action.payload,
        },
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
