import React from 'react';
import styled from 'styled-components';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';

const WhiteKeysGroup = styled.div`
  border-radius: .2rem 0 0 .2rem;
  display: grid;
  grid-column: 1;
  grid-row: 3;
  grid-template-rows:
    repeat(
      2,
      3.375rem
      3.25rem
      3.375rem
      3.25rem
      3.375rem
      3.25rem
      3.25rem
      3.375rem
    );
`;

const BlackKeysGroup = styled.div`
  border-radius: .2rem 0 0 .2rem;
  display: grid;
  grid-column: 1;
  grid-row: 3;
  align-items: flex-end;
  grid-template-rows:
    7rem
    3.75rem
    3.75rem
    5.8rem
    4rem
    6rem
    3.75rem
    3.75rem
    5.8rem
    3.75rem
    4rem;
`;

const checkIfActive = (activeNotes, noteNumber) => {
  return activeNotes.some((key) => {
    return key.note.data[1] === noteNumber;
  });
};

const Board = (props) => {
  const { activeNotes } = props;
  const whiteKeys = [
    84, 83, 81, 79, 77,
    76, 74, 72, 71, 69,
    67, 65, 64, 62, 60,
  ];
  const blackKeys = [
    82, 80, 78, 75, 73,
    70, 68, 66, 63, 61,
  ];
  return (
    <React.Fragment>
      <WhiteKeysGroup>
        {
          whiteKeys.map((noteNumber) => {
            return (
              checkIfActive(activeNotes, noteNumber)
                ? <WhiteKey active key={noteNumber} note={noteNumber} />
                : <WhiteKey key={noteNumber} note={noteNumber} />
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
                : <BlackKey key={noteNumber} />
            );
          })
        }
      </BlackKeysGroup>
    </React.Fragment>
  );
};

export default Board;
