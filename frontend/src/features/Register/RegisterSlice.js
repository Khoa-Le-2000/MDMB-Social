import { AuthActionTypes } from 'app/actions/types/authActionTypes';

const initialState = {
  fillRegister: {
    email: null,
    name: null,
    phone: null,
  },
  register: {
    error: false,
    isFetching: false,
    success: false,
    message: null,
  },
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.FILL_TO_REGISTER:
      return {
        ...state,
        fillRegister: {
          ...state.fillRegister,
          email: action.payload.email,
          name: action.payload.name,
          password: action.payload.password,
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

export default registerReducer;
