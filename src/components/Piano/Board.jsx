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
      3.25rem
      3.25rem
      3.375rem
      3.25rem
      3.375rem
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
    3.75rem
    4rem
    5.8rem
    3.75rem
    3.75rem
    5.75rem
    3.75rem
    6rem
    3.75rem
    3.75rem
    3.75rem
    5.75rem;
`;

const checkIfActive = (activeNotes, noteNumber) => {
  return activeNotes.some((key) => {
    return key.note.data[1] === noteNumber;
  });
};

const Board = (props) => {
  const { activeNotes } = props;
  const whiteKeys = [
    48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65,
    67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84,
  ];
  const blackKeys = [
    49, 51, 54, 56, 58,
    61, 63, 66, 68, 70,
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
