const AuthReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_UP_REQUESTED': {
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    }
    case 'SIGN_UP_SUCCEEDED': {
      return {
        ...state,
        user: action.user,
        isLogged: true,
        status: 'loaded',
        error: null,
      };
    }
    case 'SIGN_UP_FAILED': {
      return {
        ...state,
        isLogged: false,
        status: 'loaded',
        error: action.error.response.data,
      };
    }
    case 'LOG_IN_REQUESTED': {
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    }
    case 'LOG_IN_SUCCEEDED': {
      return {
        ...state,
        user: action.user,
        isLogged: true,
        status: 'loaded',
        error: null,
      };
    }
    case 'LOG_IN_FAILED': {
      return {
        ...state,
        isLogged: false,
        status: 'loaded',
        error: action.error.response.data,
      };
    }
    case 'LOG_OUT_REQUESTED': {
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    }
    case 'LOG_OUT_SUCCEEDED': {
      return {
        ...state,
        isLogged: false,
        status: 'loaded',
        error: null,
      };
    }
    case 'CHECK_AUTH_REQUESTED': {
      return {
        ...state,
        status: 'loading',
        error: null,
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
