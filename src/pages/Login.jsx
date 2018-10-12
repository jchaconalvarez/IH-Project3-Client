import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import AuthConnection from '../components/auth/AuthConnection';
import { Link } from 'react-router-dom';

const Login = () => (
  <div>
    <h1>Log in</h1>
    <AuthForm />
    <AuthConnection />
    <p>Don't have an account? <Link to="/signup">Sign up!</Link></p>
  </div>
);

export default Login;
