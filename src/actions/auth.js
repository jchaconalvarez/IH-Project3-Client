import auth from '../services/auth-service';
import * as actions from './actionTypes';

const signUpRequested = () => {
  return {
    type: actions.SIGN_UP_REQUESTED,
  };
};

const signUpSucceeded = (user) => {
  return {
    type: actions.SIGN_UP_SUCCEEDED,
    user,
  };
};

export const signUpFailed = (error) => {
  return {
    type: actions.SIGN_UP_FAILED,
    error,
  };
};

export const signUp = ({ email, password }) => (dispatch, getState) => {
  dispatch(signUpRequested());
  auth.signup({ email, password })
    .then(user => dispatch(signUpSucceeded(user)))
    .catch(error => dispatch(signUpFailed(error)));
};

export const logInRequested = () => {
  return {
    type: actions.LOG_IN_REQUESTED,
  };
};

export const logInSucceeded = (user) => {
  return {
    type: actions.LOG_IN_SUCCEEDED,
    user,
  };
};

export const logInFailed = (error) => {
  return {
    type: actions.LOG_IN_FAILED,
    error,
  };
};

export const logIn = ({ email, password }) => (dispatch, getState) => {
  dispatch(logInRequested());
  auth.login({ email, password })
    .then(user => dispatch(logInSucceeded(user)))
    .catch(error => dispatch(logInFailed(error)));
};
