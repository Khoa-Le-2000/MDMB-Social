import { AuthActionTypes } from '../actions/types/authActionTypes';

const initialState = {
  token: {
    accessToken: null,
    refreshToken: null,
  },
  login: {
    error: false,
    isFetching: false,
    success: false,
    message: null,
    redirect: false,
  },
  captcha: {
    errorCount: 0,
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
  redirect: {
    login: false,
    register: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
      return {
        ...state,
        token: null,
        login: {
          ...state.login,
          isFetching: true,
          error: false,
          success: false,
          message: null,
        },
        redirect: {
          ...state.redirect,
          login: false,
          register: false,
        },
        captcha: {
          ...state.captcha,
          errorCount: state?.captcha?.errorCount || 0,
        },
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: {
          ...state.token,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
        login: {
          ...state.login,
          isFetching: false,
          error: false,
          success: true,
          message: null,
        },
        redirect: {
          ...state.redirect,
          login: true,
          register: false,
        },
        register: {
          ...state.register,
          error: false,
          isFetching: false,
          success: false,
          message: null,
        },
        captcha: {
          errorCount: 0,
        },
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        login: {
          ...state.login,
          isFetching: false,
          error: true,
          success: false,
          message: action.payload,
        },
        redirect: {
          ...state.redirect,
          login: false,
          register: false,
        },
        captcha: {
          errorCount: state.captcha.errorCount + 1,
        },
      };

    case AuthActionTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        token: {
          ...state.token,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
        login: {
          ...state.login,
          isFetching: false,
          error: false,
          success: true,
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
        token: null,
        captcha: {
          ...state.captcha,
          errorCount: 0,
        },
        logout: {
          ...state.logout,
          isFetching: false,
          error: false,
          success: true,
          message: null,
        },
        login: {
          ...state.login,
        },
        register: {
          ...state.register,
          error: false,
          isFetching: false,
          success: false,
          message: null,
        },
        redirect: {
          ...state.redirect,
          login: false,
          register: false,
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

    case AuthActionTypes.REDIRECT_TO_LOGIN:
      return {
        ...state,
        redirect: {
          ...state.redirect,
          login: true,
        },
      };

    case AuthActionTypes.REDIRECT_TO_REGISTER:
      return {
        ...state,
        redirect: {
          ...state.redirect,
          register: true,
        },
      };
    case AuthActionTypes.REGISTER_START:
      return {
        ...state,
        register: {
          ...state.register,
          isFetching: true,
          error: false,
          success: false,
          message: null,
        },
      };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          isFetching: false,
          error: false,
          success: true,
          message: action.payload,
        },
        redirect: {
          ...state.redirect,
          login: true,
        },
      };
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          isFetching: false,
          error: true,
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
