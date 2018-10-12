import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import AuthConnection from '../components/auth/AuthConnection';

const Signup = () => (
  <div>
    <h1>Sign up</h1>
    <AuthConnection />
    <p>Already have an account? <Link to="/login">Log in!</Link></p>
  </div>
);

export default Signup;
