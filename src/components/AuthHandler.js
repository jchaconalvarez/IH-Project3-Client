import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import store from '../store';
import AuthForm from './AuthForm';

class AuthConnection extends Component {

  sendData = (values) => {
    if (window.location.pathname === '/signup') {
      store.dispatch({ type: 'SIGN_UP_REQUESTED', payload: values })
    } else {
      store.dispatch({ type: 'LOG_IN_REQUESTED', payload: values });
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
