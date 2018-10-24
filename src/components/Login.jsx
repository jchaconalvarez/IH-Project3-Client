import React from 'react';
import styled from 'styled-components';
import AuthHandler from './AuthHandler';
import {
  CardContainer,
  CardH1,
  CardBody,
  CardText,
  CardLink,
} from './AuthCard';

const Background = styled.div`
  background: linear-gradient(to right, #EF4957 0%, #f9d423 100%);
  clip-path: polygon(30% 0, 100% 70%, 100% 100%, 70% 100%, 0 30%, 0 0);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`;

const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100vh;
  align-items: center;
  justify-items: center;
`;

const Login = (props) => {
  const { switchForm } = props;
  return (
    <React.Fragment>
      <Background />
      <AuthContainer>
        <CardContainer>
          <CardH1>Log in</CardH1>
          <CardBody>
            <AuthHandler />
            <CardText>
              Don&apos;t have an account?
              <CardLink onClick={switchForm}> Sign up!</CardLink>
            </CardText>
          </CardBody>
        </CardContainer>
      </AuthContainer>
    </React.Fragment>
  );
};

export default Login;
