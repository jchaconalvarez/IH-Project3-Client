import React from 'react';
import AuthHandler from './AuthHandler';

const Signup = (props) => {
  const { switchForm } = props;
  return (
    <div>
      <h1>Sign up</h1>
      <AuthHandler />
      <p>
        Already have an account?
        <button type="button" onClick={switchForm}>Log in!</button>
      </p>
    </div>
  );
};

export default Signup;
