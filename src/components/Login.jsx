import React from 'react';
import AuthHandler from './AuthHandler';
import {
  CardContainer,
  CardH1,
  CardBody,
  CardText,
  CardLink,
} from './AuthCard';

const Login = (props) => {
  const { switchForm } = props;
  return (
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
  );
};

export default Login;
