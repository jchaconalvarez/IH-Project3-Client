import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { switchToLogIn, switchToSignUp } from '../actions/ui';
import AuthHandler from '../components/Auth/AuthHandler';
import backgroundPattern from '../assets/img/pattern-waves.png';
import minimidiLogo from '../assets/img/logo-minimidi.png';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  height: 100vh;
  background: linear-gradient(to top, #222 0%, #292929 100%);
`;

const LogoContainer = styled.div`
  height: inherit;
  display: grid;
  grid-template-rows: 2fr 1fr 3fr;
  place-items: center center;
  background-image: url(${backgroundPattern});
  background-repeat: repeat;
  background-size: 55%;
  h1 {
    font-size: 4.5rem;
    font-weight: 900;
    color: #0F8FAB;
    margin: 0;
    align-self: flex-start;
  }
`;

const Logo = styled.img`
  margin-top: 20rem;
  width: 50%;
  align-self: flex-end;
`;

const AuthContainer = styled.div`
  display: grid;
  justify-items: center;
  padding: 0 20%;
  background: #F0F0F0;
`;

const FormSelectorContainer = styled.div`
  justify-self: start;
  align-self: flex-end;
  text-align: left;
`;

const FormSelectors = styled.a`
  color: ${props => props.showLogin ? '#C2C2C2' : '#0F8FAB'};
  border-bottom: 4px solid ${props => props.showLogin ? '#C2C2C2' : '#0F8FAB'};
  font-size: 2rem;
  font-weight: 900;
  margin-right: 3rem;
  padding-bottom: 0.3rem;
`;

const Home = (props) => {
  const { showLogin, switchToLogIn, switchToSignUp, error } = props;
  return (
    <Container>
      <LogoContainer>
        <Logo src={minimidiLogo} />
        <h1>minimidi</h1>
      </LogoContainer>
      <AuthContainer>
        <FormSelectorContainer>
          <FormSelectors showLogin={showLogin} onClick={switchToSignUp}>Sign Up</FormSelectors>
          <FormSelectors showLogin={!showLogin} onClick={switchToLogIn}>Log In</FormSelectors>
        </FormSelectorContainer>
        <AuthHandler />
      </AuthContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    showLogin: state.ui.showLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchToLogIn: () => dispatch(switchToLogIn()),
    switchToSignUp: () => dispatch(switchToSignUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
