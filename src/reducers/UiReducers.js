const UiReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SWITCH_AUTH_FORM': {
      return {
        ...state,
        showLogin: !state.showLogin,
      };
    }
    default: {
      return state;
    }
  }
};

export default UiReducers;
