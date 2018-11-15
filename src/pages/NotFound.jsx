import React from 'react';
import styled from 'styled-components';
import backgroundPattern from '../assets/img/404-minimidi-background.png';
import BackButton from '../components/BackButton';

const Container = styled.div`
  height: 100vh;
  min-height: 100%;
  font-family: Nunito Sans;
  background-image: url(${backgroundPattern});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: start center;
  color: #0F8FAB;
`;

const Error = styled.div`
  font-size: 15rem;
  font-weight: 900;
`;

const ErrorTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 900;
`;

const NotFound = () => {
  return (
    <Container>
      <div>
        <Error>404</Error>
        <ErrorTitle>Woops, page not found</ErrorTitle>
      </div>
      <BackButton />
    </Container>
  );
};

export default NotFound;
