import React, { Component } from 'react';
import styled from 'styled-components';
import Board from './Board';
import MusicSheet from './MusicSheet';
import { onMIDISuccess, onMIDIFailure } from '../../services/midi-service';

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 50px auto 50px;
`;

const Wrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  position: fixed;
  margin-bottom: 8px;
  bottom: 0;
  width: 100%;
`;

const WrapperSheet = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
`;

export default class Piano extends Component {
  state = {
    canIPlay: false,
  }

  componentDidMount() {
    this.listenForMIDIAccess();
  }

  listenForMIDIAccess = (notes) => {
    navigator.requestMIDIAccess({ sysex: false })
      .then(onMIDISuccess)
      .catch(onMIDIFailure);
  }

  render() {
    return (
      <Container>
        {/* <button onClick={this.handleRec}>Rec</button> */}
        <WrapperSheet>
          <MusicSheet>
            Q W E R T Y U Q W E R T Y U Q W E R T Y U
          </MusicSheet>
        </WrapperSheet>
        <Wrapper>
          <Board />
        </Wrapper>
      </Container>
    );
  };
}
