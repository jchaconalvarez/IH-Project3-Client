import React from 'react';
import styled from 'styled-components';
import backgroundPattern from '../assets/img/pattern-waves.png';
import minimidiLogo from '../assets/img/logo-minimidi.png';
import BackButton from '../components/BackButton';

const Container = styled.div`
  background: linear-gradient(to top, #222 0%, #292929 100%);;
  height: 100vh;
`;

const ErrorContainer = styled.div`
  background-image: url(${backgroundPattern});
  background-repeat: repeat;
  background-size: 25%;
  height: inherit;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  place-items: center center;
`;

const LogoWrapper = styled.div`
  grid-row: 2;
  text-align: center;
`;

const InfoWrapper = styled.div`
  grid-row: 3;
`;

const Error = styled.span`
  font-size: 10rem;
  font-weight: 900;
  color: #0F8FAB;
`;

const Logo = styled.img`
  width: 15%;
  animation: spin infinite 20s linear;

  @keyframes spin {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
`;

const Title = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: #DADADA;
  text-align: center;
  margin-bottom: 5rem;
`;

const NotFound = () => {
  return (
    <Container>
      <ErrorContainer>
        <LogoWrapper>
          <Error>4</Error>
          <Logo src={minimidiLogo}></Logo>
          <Error>4</Error>
        </LogoWrapper>
        <InfoWrapper>
          <Title>Not Found</Title>
        </InfoWrapper>
        <BackButton />
      </ErrorContainer>
    </Container>
  );
};

export default NotFound;
