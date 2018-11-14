import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signUp, logIn } from '../../actions/auth';
import AuthForm from './AuthForm';

const StyleWrapper = styled.div`
  margin: 25% 0 25% 0;
  width: 100%;
  height: 35rem;
`;

class AuthHandler extends Component {
  sendData = ({ email, password }) => {
    const { showLogin, signUp, logIn } = this.props;
    console.log('sendData:', email, password);
    showLogin ? logIn({ email, password }) : signUp({ email, password });
  }

  render() {
    const { showLogin, error } = this.props;
    const initialValues = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    return (
      <StyleWrapper>
        <AuthForm initialValues={initialValues} sendData={this.sendData} showLogin={showLogin} error={error} />
      </StyleWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    isLogged: state.session.isLogged,
    showLogin: state.ui.showLogin,
    error: state.session.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: ({ email, password }) => dispatch(signUp({ email, password })),
    logIn: ({ email, password }) => dispatch(logIn({ email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHandler);
