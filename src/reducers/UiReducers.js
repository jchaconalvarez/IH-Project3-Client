const UiReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SWITCH_AUTH_FORM': {
      return {
        ...state,
        showLogin: !state.showLogin,
      };
    }
    case 'SWITCH_TO_LOG_IN': {
      return {
        ...state,
        showLogin: true,
      };
    }
    case 'SWITCH_TO_SIGN_UP': {
      return {
        ...state,
        showLogin: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default UiReducers;
