import React, { Component } from 'react';
import styled from 'styled-components';
import Board from './Board';
import MusicSheet from './MusicSheet';
import { onMIDISuccess, onMIDIFailure, midi } from '../../services/midi-service';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  position: fixed;
  margin-bottom: 8px;
  bottom: 0;
  width: 100%;
`;

export default class Piano extends Component {
  state = {
    canIPlay: false,
  }

  componentDidMount() {
    this.listenForMIDIAccess();
  }

  handleClick = () => {
    const { canIPlay } = this.state;
    this.setState({
      canIPlay: !canIPlay,
    });
  }

  listenForMIDIAccess = (notes) => {
    navigator.requestMIDIAccess({ sysex: false })
      .then(onMIDISuccess)
      .catch(onMIDIFailure);
  }

  render() {
    const { canIPlay } = this.state;
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>Play music</button>
        <button onClick={this.handleRec}>Rec</button>
        <MusicSheet>

        </MusicSheet>
        <Wrapper>
          <Board />
        </Wrapper>
      </React.Fragment>
    );
  };
}
