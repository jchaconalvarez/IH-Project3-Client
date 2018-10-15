import React from 'react';
import AuthHandler from './AuthHandler';

const Login = (props) => {
  const { switchForm } = props;
  return (
    <div>
      <h1>Log in</h1>
      <AuthHandler />
      <p>
        Don&apos;t have an account?
        <button type="button" onClick={switchForm}>Sign up!</button>
      </p>
    </div>
  );
};

export default Login;
