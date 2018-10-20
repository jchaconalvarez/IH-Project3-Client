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
  transform: skewY(10deg);
  background-image: linear-gradient(to right, #EF4957 0%, #f9d423 100%);
`;

const UnSkewY = styled.div`
  transform: skewY(-10deg);
`;

const Login = (props) => {
  const { switchForm } = props;
  return (
    <Background>
      <UnSkewY>
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
      </UnSkewY>
    </Background>
  );
};

export default Login;
