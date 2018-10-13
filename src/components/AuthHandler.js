import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signUp, logIn } from '../actions/auth';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';

class AuthConnection extends Component {

  sendData = ({ email, password }) => {
    if (window.location.pathname === '/signup') {
      this.props.signUp({ email, password });
    } else {
      this.props.logIn({ email, password });
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

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    isLogged: state.session.isLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: ({ email, password }) => dispatch(signUp({ email, password })),
    logIn: ({ email, password }) => dispatch(logIn({ email, password })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthConnection);
