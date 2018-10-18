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
        isLogged: false,
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
        isLogged: false,
        status: 'loaded',
      };
    }
    case 'CHECK_AUTH_REQUESTED': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'CHECK_AUTH_SUCCEEDED': {
      return {
        ...state,
        user: action.user,
        isLogged: true,
        status: 'loaded',
      };
    }
    case 'CHECK_AUTH_FAILED': {
      return {
        ...state,
        isLogged: false,
        status: 'loaded',
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducers;
