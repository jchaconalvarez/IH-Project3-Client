import React from 'react';
import styled from 'styled-components';
import PianoForm from './PianoForm';
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
  grid-gap: 0.5rem;
  display: grid;
  grid-template-areas:
    '. name name name midi midi midi midi metronome chrono chrono chrono .'
    '. device device device device device device device metronome rec play clear.';
    /* '. name name name midi midi midi midi metronome chrono chrono rec play clear .'
    '. device device device device device device device metronome audio audio audio audio audio .'; */
  justify-items: center;
  align-items: center;
`;

const RecBtn = styled.button`
  grid-area: rec;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: #DBA112;
  box-shadow: ${props => props.isRecording ? '0 0 5px #FFF, 0 0 10px #FFF, 0 0 25px #C46B00, 0 0 30px #C46B00' : '0 5px #C46B00'};
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

const InstrumentWrapper = styled.div`
  grid-area: device;
  width: 100%;
  height: 0.9rem;
  font-size: 0.5rem;
  text-align: center;
  /* font-size: 0.8rem;
  text-shadow: 0 1px #353535;
  color:#F8F8F8;
  border: 1px solid #6B6A6A;
  border-radius: 3px;
  background: linear-gradient(#6B6A6A,#4C4C4C); */
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
`;

const NoteWrapper = styled.div`
  grid-area: midi;
  width: 100%;
  height: 0.9rem;
  font-size: 0.5rem;
  /* color: white;
  border: 1px solid #6B6A6A;
  border-radius: 3px;
  background: linear-gradient(#6B6A6A,#4C4C4C); */
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

const NoteNum = styled.a`
  font-size: 1rem;
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
    changeName,
  } = props;
  return (
    <ControlWrapper>
      <RecBtn onClick={onRecording} isRecording={isRecording} />
      <InstrumentWrapper>{midiInstrument}</InstrumentWrapper>
      <PianoForm changeName={changeName} />
      <NoteWrapper>
        {
          activeNotes.map((noteNum, index) => {
            return (
              <NoteNum key={index}>{noteNum.note.data[1]}</NoteNum>
            );
          })
        }
      </NoteWrapper>
      <ControlBtn area="play" type="button" onClick={startPlayback}><PlaySymbol /></ControlBtn>
      <ControlBtn area="clear" type="button" onClick={clearHistory}>Clear</ControlBtn>
      <Metronome />
      <Chronometer />
    </ControlWrapper>
  );
}
