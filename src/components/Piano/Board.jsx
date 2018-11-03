import React from 'react';
import styled from 'styled-components';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';

const WhiteKeysGroup = styled.div`
  border-radius: .2rem 0 0 .2rem;
  display: grid;
  grid-column: 1;
  grid-row: 3;
  grid-template-rows: repeat(17, 1.56rem);
`;

const BlackKeysGroup = styled.div`
  border-radius: .2rem 0 0 .2rem;
  display: grid;
  grid-column: 1;
  grid-row: 3;
  margin-top: calc(1.56rem - (0.93rem/2));
  grid-template-rows: 1.56rem 3.12rem 1.56rem 1.56rem 3.12rem 1.56rem 3.12rem 1.56rem 1.56rem 3.12rem 1.56rem 1.56rem;
`;

const checkIfActive = (activeNotes, noteNumber) => {
  return activeNotes.some((key) => {
    return key.note.data[1] === noteNumber;
  });
};

const handleClick = (noteNumber) => {
  console.log( noteNumber )
}

const Board = (props) => {
  const { activeNotes } = props;
  const whiteKeys = [36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65];
  const blackKeys = [37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63];
  return (
    <React.Fragment>
      <WhiteKeysGroup>
        {
          whiteKeys.map((noteNumber) => {
            return (
              checkIfActive(activeNotes, noteNumber)
                ? <WhiteKey active key={noteNumber} />
                : <WhiteKey key={noteNumber} onClick={() => handleClick(noteNumber)} />
            );
          })
        }
      </WhiteKeysGroup>
      <BlackKeysGroup>
        {
          blackKeys.map((noteNumber) => {
            return (
              checkIfActive(activeNotes, noteNumber)
                ? <BlackKey active key={noteNumber} />
                : <BlackKey key={noteNumber} onClick={() => handleClick(noteNumber)} />
            );
          })
        }
      </BlackKeysGroup>
    </React.Fragment>
  );
};

export default Board;
