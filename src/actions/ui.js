import * as actions from './actionTypes';

export const switchToLogIn = () => {
  return {
    type: actions.SWITCH_TO_LOG_IN,
  };
};

export const switchToSignUp = () => {
  return {
    type: actions.SWITCH_TO_SIGN_UP,
  };
};
