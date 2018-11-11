import React, { Component } from 'react';
import styled from 'styled-components';
import metronomeSound from '../../assets/audio/Metronome.wav';
import metronomeSoundUp from '../../assets/audio/MetronomeUp.wav';

const MetronomeWrapper = styled.div`
  grid-area: metronome;
  margin-left: 0.6rem;
  width: 6rem;
  height: 6rem;
  border: none;
  border-radius: 50%;
  background: linear-gradient(#4C4C4C, #6B6A6A,#4C4C4C);
  font-family: 'Raleway', sans-serif;
  overflow: hidden;
  display: grid;
  place-items: center;
  grid-template-areas: 
    '. bpm bpm bpm .'
    '. bpm bpm bpm .'
    '. bpm bpm bpm .'
    '. slider slider tempo .'
    '. btn btn btn .';
`;

const Bpm = styled.div`
  grid-area: bpm;
  color: #ddd;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid ${props => props.active ? '#0F8FAB' : '#DBA112'};
  cursor: default;
`;

const Slider = styled.input`
  grid-area: slider;
  margin-left: 0.5rem;
  width: 80%;
  outline: none;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Tempo = styled.input`
  grid-area: tempo;
  margin-right: 0.5rem;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  color: #ddd;
  background: linear-gradient(to right, rgba(255,0,0,0), #888787);
  /* background: #888787; */
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const Btn = styled.button`
  grid-area: btn;
  color: white;
  /* background-color: #353535; */
  border: none;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
   /* background: repeating-linear-gradient(
    45deg,
    rgba(184, 184, 184, .4)10px,
    #4C4C4C 10px, 
    rgba(184, 184, 184, .4)30px,
    #4C4C4C 50px
  ); */
  text-shadow: 0 1px #353535;
  color:#F8F8F8;
  background: linear-gradient(#4C4C4C, #353535);

  &:active{
    background-color: #6B6A6A;
  }
`;

export default class Metronome extends Component {
  state = {
    canTicking: false,
    bpm: 100,
    tempo: 4,
    counter: 0,
  };

  makeTick = () => {
    const { counter, tempo, canTicking } = this.state;
    if (canTicking) {
      if (counter % tempo === 0) {
        new Audio(metronomeSoundUp).play();
      } else {
        new Audio(metronomeSound).play();
      }
      this.setState(({
        counter: (counter + 1) % tempo,
      }));
    }
  }

  handleBPMInput = (e) => {
    // this.setState({ bpm: e.target.value });
    const { canTicking } = this.state;
    const bpm = e.target.value;
    if (canTicking) {
      clearInterval(this.timeInterval);
      this.timeInterval = setInterval(
        this.makeTick, (60 / bpm) * 1000,
      );
      this.setState({
        counter: 0,
        bpm,
      });
    } else {
      this.setState({ bpm });
    }
  };

  handleTempoInput = (e) => {
    this.setState({ tempo: e.target.value })
  }

  handleTick = () => {
    const { canTicking, bpm } = this.state;
    if (canTicking) {
      clearInterval(this.timeInterval);
      this.setState({
        canTicking: false,
        counter: 0,
      });
    } else {
      this.timeInterval = setInterval(
        this.makeTick, (60 / bpm) * 1000,
      );
      this.setState({
        canTicking: true,
        counter: 0,
      });
    }
  }

  render() {
    const {
      bpm,
      canTicking,
      tempo,
      counter,
    } = this.state;
    return (
      <MetronomeWrapper>
        {counter === 1 ? <Bpm active>{bpm}</Bpm> : <Bpm>{bpm}</Bpm>}
        <Slider
          type="range"
          min="30"
          max="300"
          value={bpm}
          onChange={this.handleBPMInput}
        />
        <Tempo
          value={tempo}
          onChange={this.handleTempoInput}
        />
        <Btn type="button" onClick={this.handleTick}>{canTicking ? 'OFF' : 'ON'}</Btn>
      </MetronomeWrapper>
    );
  }
}
