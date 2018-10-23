import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Piano from '../components/Piano/Piano';

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(9, 1fr);
  background: linear-gradient(#F9D423,#EF4957);
}
`;

const NavbarContainer = styled.div`
  background: rgba(0, 0, 0, .2);
  display: grid;
  grid-column: -1;
  grid-row: 1/3;
  grid-template-columns: 1;
  align-content: start;
  justify-items: end;
  align-self: end;
  padding: 10px;
  border-left: 4px solid #EF4957;
`;

const Play = () => {
  return (
    <Container>
      <NavbarContainer>
        <NavBar />
      </NavbarContainer>
      <Piano />
    </Container>
  );
};

export default Play;
