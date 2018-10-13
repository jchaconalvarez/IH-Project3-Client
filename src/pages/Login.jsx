import React from 'react';
import { Link } from 'react-router-dom';
import AuthConnection from '../components/AuthHandler';

const Login = () => (
  <div>
    <h1>Log in</h1>
    <AuthConnection />
    <p>
      Don&apos;t have an account?
      <Link to="/signup">Sign up!</Link>
    </p>
  </div>
);

export default Login;
