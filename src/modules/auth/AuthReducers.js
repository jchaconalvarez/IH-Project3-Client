import { combineReducers } from 'redux';

const AuthReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCEEDED': {
      return { ...state, user: action.user, isLogged: true };
    }
    case 'LOG_IN_SUCCEEDED': {
      return { ...state, user: action.user, isLogged: true };
    }
    case 'LOG_OUT_SUCCEEDED': {
      return { ...state, user: {}, isLogged: false };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducers;
