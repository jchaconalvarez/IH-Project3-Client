import React from 'react';
import styled from 'styled-components';

const Sheet = styled.div`
  background-color: papayawhip;
  width: 100%;
  color: tomato;
  font-size: 2rem;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 0.3rem;
`;

const BackTwo = styled.div`
  margin: 3% 3% 0 3%;
  position: absolute;
  width: 580px;
  height: 90%;
  background: #FAFAFA;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  transform: rotate(2deg);
`;

const Content = styled.p`
/* @font-face {
  font-family: 'Lassus';
  src: url('../../fonts/Lassus.ttf') format('truetype');
} */
  font-family: 'Lassus';
  margin: 10%;
`;

const Wrapper = styled.div`
  
`;


export const MusicSheet = (props) => {
  return (
    <Sheet>
      {props.children}
    </Sheet>
  );
}
