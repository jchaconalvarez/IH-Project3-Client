const AuthReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_UP_REQUESTED': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'SIGN_UP_SUCCEEDED': {
      return {
        ...state,
        user: action.user,
        isLogged: true,
        status: 'loaded',
      };
    }
    case 'SIGN_UP_FAILED': {
      return {
        ...state,
        error: action.error,
        status: 'loaded',
      };
    }
    case 'LOG_IN_REQUESTED': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'LOG_IN_SUCCEEDED': {
      return {
        ...state,
        user: action.user,
        isLogged: true,
        status: 'loaded',
      };
    }
    case 'LOG_IN_FAILED': {
      return {
        ...state,
        error: action.error,
        status: 'loaded',
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducers;
