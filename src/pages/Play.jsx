import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Piano from '../components/Piano/Piano';

const Container = styled.div`
  display: grid;
  /* grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr); */
`;

const Wrapper = styled.div`
  grid-column: 1 / span 1;
`;

const Play = () => {
  return (
    <Container>
      <Wrapper>
        <NavBar />
      </Wrapper>
      <Piano />
    </Container>
  );
};

export default Play;
