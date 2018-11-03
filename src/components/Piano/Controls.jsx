import React from 'react';
import styled from 'styled-components';
import PianoForm from './PianoForm';

const ControlWrapper = styled.div`
  grid-column: 2;
  grid-row: 2;
  background-color: #F9D423;
  padding: 1rem;
  margin: 2rem 2rem 0 0;
  border-radius: .5rem .5rem 0 0;
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

export default function Controls(props) {
  return (
    <ControlWrapper>
      <RecBtn onClick={() => { props.onRecording(); }} isRecording={props.isRecording} />
      <span> { props.midiInstrument }</span>
      { props.children }
      <button type="button" onClick={() => { props.clearHistory(); }}>Clear</button>
      <span> ¯\_(ツ)_/¯  </span>
    </ControlWrapper>
  );
}
