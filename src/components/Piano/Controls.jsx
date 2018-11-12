import React from 'react';
import styled from 'styled-components';
import Metronome from './Metronome';
import Chronometer from './Chronometer';

const ControlWrapper = styled.div`
  font-family: 'Raleway', sans-serif;
  grid-column: 2;
  grid-row: 2;
  /* background-color: #0F8FAB; */
  background-color: #4C4C4C;
  padding: 1rem;
  margin: 2rem 2rem 0 0;
  border-radius: .5rem .5rem 0 0;
  /* grid-gap: 0.5rem; */
  display: grid;
  grid-template-areas:
    '. device device metronome chrono chrono chrono .'
    '. midi note metronome rec play clear .';
  justify-items: stretch;
  align-items: center;
`;

const RecBtn = styled.button`
  grid-area: rec;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: #DBA112;
  box-shadow: ${props => props.isRecording ? '0 0 5px #FFF, 0 0 10px #FFF, 0 0 25px #C46B0040, 0 0 30px #C46B0040' : '0 5px #C46B0040'};
  transform: translateY(${props => props.isRecording ? '5px' : '0'});
`;

const ControlBtn = styled.button`
  grid-area: ${props => props.area === 'clear' ? 'clear' : 'play'};
  cursor: pointer;
  width: 60px;
  height: 30px;
  text-align: center;
  text-shadow: 0 1px #353535;
  color:#F8F8F8;
  border: 1px solid #6B6A6A;
  border-radius: 3px;
  background: linear-gradient(#6B6A6A,#4C4C4C);

  &:active {
    color: #D3D3D3;
    background:#4C4C4C;
    box-shadow: inset 0 0 5px 2px rgba(53,53,53,.5);
  }
`;

const PlaySymbol = styled.div`
  display: inline-block;
  border-style: solid;
  border-color: transparent transparent transparent white;
  box-sizing: border-box;
  border-width: 0.5rem 0 0.5rem 0.8rem;
`;

const PauseSymbol = styled.div`
  height: 20px;
  background: #FFF;
  -webkit-clip-path: polygon(30% 0, 30% 100%, 40% 100%, 40% 0, 60% 0, 60% 100%, 30% 100%, 70% 100%, 70% 0);
clip-path: polygon(30% 0, 30% 100%, 40% 100%, 40% 0, 60% 0, 60% 100%, 30% 100%, 70% 100%, 70% 0);
`;

const InstrumentWrapper = styled.div`
  grid-area: device;
  width: 32rem;
  height: 0.9rem;
  font-size: 0.5rem;
  text-align: center;
  background: #353535;
  overflow: hidden;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(#6B6A6A 20%, #4C4C4C 80%) 1 100%;
  padding: 0.3rem;
  color: white;
  font-size: 0.8rem;
  text-shadow:
    0 0 5px #0F8FAB,
    0 0 10px #0F8FAB,
    0 0 15px #0F8FAB,
    0 0 20px #0F8FAB,
    0 0 60px #0F8FAB,
    0 0 70px white,
    0 0 80px white,
    0 0 100px white;

  &::before {
    content: 'Device: ';
    text-shadow: none;
  }
`;

const NoteWrapper = styled.div`
  grid-area: ${props => props.area === 'note' ? 'note' : 'midi'};;
  width: 12.5rem;
  height: 0.9rem;
  font-size: 0.5rem;
  overflow: hidden;
  text-align: center;
  background: #353535;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(#6B6A6A 20%, #4C4C4C 80%) 1 100%;
  padding: 0.3rem;
  color: white;
  font-size: 0.8rem;
`;

const Note = styled.a`
  font-size: 1rem;
  margin-right: 0.2rem;
  text-shadow:
    0 0 5px #DBA112,
    0 0 10px #DBA112,
    0 0 15px #DBA112,
    0 0 20px #DBA112,
    0 0 60px #DBA112,
    0 0 70px white,
    0 0 80px white,
    0 0 100px white;
`;

export default function Controls(props) {
  const {
    activeNotes,
    onRecording,
    isRecording,
    midiInstrument,
    startPlayback,
    clearHistory,
    translateMidiToNote,
    noteHistory,
  } = props;
  return (
    <ControlWrapper>
      <RecBtn onClick={onRecording} isRecording={isRecording} />
      <InstrumentWrapper>{midiInstrument}</InstrumentWrapper>
      <NoteWrapper area="midi">
        {
          activeNotes.map((noteNum, index) => {
            return (
              <Note key={index}>{noteNum.note.data[1]}</Note>
            );
          })
        }
      </NoteWrapper>
      <NoteWrapper area="note">
        {
          activeNotes.map((noteNum, index) => {
            return (
              <Note key={index}>{translateMidiToNote(noteNum.note.data[1])} </Note>
            );
          })
        }
      </NoteWrapper>
      <ControlBtn area="play" type="button" onClick={startPlayback}>
        {<PlaySymbol /> && <PauseSymbol />}
      </ControlBtn>
      <ControlBtn area="clear" type="button" onClick={clearHistory}>Clear</ControlBtn>
      <Metronome />
      <Chronometer isRecording={isRecording} />
    </ControlWrapper>
  );
}
