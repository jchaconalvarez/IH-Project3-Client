import React from 'react';
import styled from 'styled-components';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';

const BoardStyle = styled.div`
  display: grid;
  grid-template-columns: 10px auto 10px;
  grid-template-rows: 1fr auto auto 30px;
  background: #f9d423;
  border-radius: 12px;
  border-bottom: 8px solid #E2BE09;
`;

const BoardControls = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  align-content: center;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 1fr auto 1fr;
`;

const WhiteKeysGroup = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 2 / 3;
  justify-items: center;
  align-content: center;
  grid-template-columns: repeat(14, 1fr);
`;

const BlackKeysGroup = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 2;
  justify-content: start;
  align-self: start;
  margin-left: 35px;
  grid-template-columns: 20px 70px 20px 20px 70px 20px 70px 20px 20px 20px;
  grid-column-gap: 30px;
`;

const RecBtn = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: tomato;
  box-shadow: 0 5px #EF4957;

  &:active {
    box-shadow: 
      0 0 5px #fff, 0 0 10px #fff, 
      0 0 25px red, 0 0 30px red; 
    transform: translateY(5px);
  }
`;


const Board = (props) => {
  return (
    <BoardStyle>
      <BoardControls>
        <RecBtn onClick={() => { props.onRecording(); }} />
        <a>{props.children}</a>
      </BoardControls>
      <WhiteKeysGroup>
        <WhiteKey id="C2" />
        <WhiteKey id="D2" />
        <WhiteKey id="E2" />
        <WhiteKey id="F2" />
        <WhiteKey id="G2" />
        <WhiteKey id="A2" />
        <WhiteKey id="B2" />
        <WhiteKey id="C3" />
        <WhiteKey id="D3" />
        <WhiteKey id="E3" />
        <WhiteKey id="F3" />
        <WhiteKey id="G3" />
        <WhiteKey id="A3" />
        <WhiteKey id="B3" />
      </WhiteKeysGroup>
      <BlackKeysGroup>
        <BlackKey id="C#2" />
        <BlackKey id="D#2" />
        <BlackKey id="F#2" />
        <BlackKey id="G#2" />
        <BlackKey id="A#2" />
        <BlackKey id="C#3" />
        <BlackKey id="D#3" />
        <BlackKey id="F#3" />
        <BlackKey id="G#3" />
        <BlackKey id="A#3" />
      </BlackKeysGroup>
    </BoardStyle>
  );
};

export default Board;
