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

const Box = styled.a`
  grid-column: 2;
  background-color: mediumseagreen;
`;

const checkIfActive = (activeNotes, noteNumber) => {
  return activeNotes.some((key) => {
    return key.note.data[1] === noteNumber
  });
};

// const handleClick = (noteNumber) => {
//   const AudioContext = window.AudioContext || window.webkitAudioContext;
//   const context = new AudioContext();
//   const noteHz = 440 * (2 ** ((noteNumber - 69) / 12));;
//   const oscillatorNode = context.createOscillator();
//   const gainNode = context.createGain();
//   gainNode.connect(context.destination);
//   oscillatorNode.type = 'square';
//   oscillatorNode.frequency.value = noteHz;
//   oscillatorNode.connect(gainNode);
//   oscillatorNode.start()
// }

const Board = (props) => {
  const { activeNotes } = props;
  const whiteKeys = [36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65];
  const blackKeys = [37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63];
  // const handleClick = (noteNumber) => {
  //   props.addKeytoActiveNotes(noteNumber)
  // }

  return (
    <React.Fragment>
      <WhiteKeysGroup>
        {
          whiteKeys.map((noteNumber) => {
            return (
              checkIfActive(activeNotes, noteNumber)
                ? <WhiteKey active key={noteNumber} />
                : <WhiteKey key={noteNumber} />
                // : <WhiteKey key={noteNumber} onClick={() => handleClick(noteNumber)} />
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
