import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Piano from '../components/Piano/Piano';

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 1fr 5fr 1fr;
  background: linear-gradient(#F9D423,#EF4957);
}
`;

const Play = () => {
  return (
    <Container>
      <NavBar />
      <Piano />
    </Container>
  );
};

export default Play;
