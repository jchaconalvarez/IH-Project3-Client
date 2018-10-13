export const signUp = (user) => {
  return {
    type: 'SIGN_UP_REQUESTED',
    user,
  };
};

export const logIn = (user) => {
  return {
    type: 'LOG_IN',
    user,
  };
};

export const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};
