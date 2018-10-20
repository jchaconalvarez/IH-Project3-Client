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

const Signup = (props) => {
  const { switchForm } = props;
  return (
    <Background>
      <UnSkewY>
        <CardContainer>
          <CardH1>Sign up</CardH1>
          <CardBody>
            <AuthHandler />
            <CardText>
              Already have an account?
              <CardLink onClick={switchForm}>Log in!</CardLink>
            </CardText>
          </CardBody>
        </CardContainer>
      </UnSkewY>
    </Background>
  );
};

export default Signup;
