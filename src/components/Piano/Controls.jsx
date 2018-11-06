import React from 'react';
import styled from 'styled-components';
import PianoForm from './PianoForm';
import Metronome from './Metronome';
import BtnControl from './BtnControl';

const ControlWrapper = styled.div`
  grid-column: 2;
  grid-row: 2;
  background-color: #1B998B;
  padding: 1rem;
  margin: 2rem 2rem 0 0;
  border-radius: .5rem .5rem 0 0;
  /* display: grid;
  grid-template-columns: repeat( auto-fit, minmax(5rem, 1fr) );
  column-gap: 0.5rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

const InstrumentWrapper = styled.div`
  width: 20%;
  height: 20px;
  text-align: center;
  font-size: 0.8rem;
  text-shadow: 0 1px #353535;
  color:#F8F8F8;
  border: 1px solid #6B6A6A;
  border-radius: 3px;
  background: linear-gradient(#6B6A6A,#4C4C4C);
`;

const NoteWrapper = styled.div`
  width: 80px;
  height: 20px;
  text-align: center;
  font-size: 0.5rem;
  color: white;
  border: 1px solid #6B6A6A;
  border-radius: 3px;
  background: linear-gradient(#6B6A6A,#4C4C4C);
`;

const NoteNum = styled.a`
  font-size: 1rem;
  text-shadow:
    0 0 5px tomato,
    0 0 10px tomato,
    0 0 15px tomato,
    0 0 20px white,
    0 0 60px white,
    0 0 70px white,
    0 0 80px white,
    0 0 100px white;
`;

export default function Controls(props) {
  const {
    onRecording,
    isRecording,
    isPlaying,
    midiInstrument,
    playSong,
    clearHistory
  } = props;
  return (
    <ControlWrapper>
      <RecBtn onClick={onRecording} isRecording={isRecording} />
      <InstrumentWrapper> { midiInstrument }</InstrumentWrapper>
      { props.children }
      <label>Midi</label>
      <NoteWrapper>
        {
          props.activeNotes.map((noteNum, index) => {
            return (
              <NoteNum key={index}>{noteNum.note.data[1]}</NoteNum>
            )
          })
        }
      </NoteWrapper>
      <button type="button" onClick={playSong}>{isPlaying ? 'Play' : 'Pause'}</button>
      <button type="button" onClick={clearHistory}>Clear</button>
      <Metronome></Metronome>
    </ControlWrapper>
  );
}
