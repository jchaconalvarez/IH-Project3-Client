import React from 'react';
import styled from 'styled-components';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';

const BoardStyle = styled.div`
  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 1fr auto auto 30px;
  background: #F9D423;
  border-radius: 12px;
  border-bottom: 8px solid #E2BE09;
  /* border-right: 10px solid #F9D423;
  border-left: 10px solid #F9D423; */
  place-items: center;
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
  /* margin-left: 35px; */
  margin-left: -10px;
  grid-template-columns: 20px 70px 20px 20px 70px 20px 70px 20px 20px 20px;
  grid-column-gap: 30px;
`;

const RecBtn = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: tomato;
  box-shadow: ${props => props.isRecording ? '0 0 5px #FFF, 0 0 10px #FFF, 0 0 25px red, 0 0 30px red' : '0 5px #EF4957'};
  transform: translateY(${props => props.isRecording ? '5px' : '0'});
`;

const checkIfActive = (activeNotes, noteNumber) => {
  return activeNotes.some((key) => {
    return key.note.data[1] === noteNumber;
  });
};

const Board = (props) => {
  const { activeNotes } = props;
  const whiteKeys = [36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59];
  const blackKeys = [37, 39, 42, 44, 46, 49, 51, 54, 56, 58];
  return (
    <BoardStyle>
      <BoardControls>
        <RecBtn onClick={() => { props.onRecording(); }} isRecording={props.isRecording} />
        <a>{props.children}</a>
      </BoardControls>
      <WhiteKeysGroup>
        {
          whiteKeys.map((noteNumber) => {
            return (
              checkIfActive(activeNotes, noteNumber)
                ? <WhiteKey active key={noteNumber} /> : <WhiteKey key={noteNumber} />
            );
          })
        }
      </WhiteKeysGroup>
      <BlackKeysGroup>
        {
          blackKeys.map((noteNumber) => {
            return (
              checkIfActive(activeNotes, noteNumber)
                ? <BlackKey active key={noteNumber} /> : <BlackKey key={noteNumber} />
            );
          })
        }
      </BlackKeysGroup>
    </BoardStyle>
  );
};

export default Board;
