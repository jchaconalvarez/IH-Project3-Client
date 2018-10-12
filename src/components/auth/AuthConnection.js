import React, { Component } from 'react';
import AuthForm from './AuthForm';
import auth from '../../lib/auth-service';

class AuthConnection extends Component {
  sendData = (values) => {
    console.log('AUTHCONNECTION: SENDDATA', values);
    if (window.location.pathname === '/signup') {
      auth.signup(values);
    }
  }

  render() {
    const initialValues = {
      email: '',
      password: '',
    };
    return (
      <AuthForm initialValues={initialValues} sendData={this.sendData} />
    );
  }
}

export default AuthConnection;
