import React from 'react';
import styled from 'styled-components';


const Sheets = styled.div`
  margin: 3% 3% 0 3%;
  position: absolute;
  width: 580px;
  height: 90%;
  background: #FAFAFA;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
`;

const BackOne = styled.div`
  margin: 3% 3% 0 3%;
  position: absolute;
  width: 580px;
  height: 90%;
  background: #FAFAFA;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  transform: rotate(-3deg);
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
    <Wrapper>
      <BackOne />
      <BackTwo />
      <Sheets>
        <Content>{props.children}</Content>
      </Sheets>
    </Wrapper>
  )
};

export default MusicSheet;
