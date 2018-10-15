import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, logIn } from '../actions/auth';
import AuthForm from './AuthForm';

class AuthHandler extends Component {

  sendData = ({ email, password }) => {
    const { showLogin, signUp, logIn } = this.props;
    showLogin ? logIn({ email, password }) : signUp({ email, password });
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: ({ email, password }) => dispatch(signUp({ email, password })),
    logIn: ({ email, password }) => dispatch(logIn({ email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHandler);
