import React, { Component } from 'react';
import styled from 'styled-components';
import metronomeSound from './audio/Metronome.wav';
import metronomeSoundUp from './audio/MetronomeUp.wav';
import BtnControl from './BtnControl';

const MetronomeWrapper = styled.div`
`;

const Slider = styled.input`
  outline: none;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Tempo = styled.input`
  width: 1rem;
`;

const LightMarker = styled.div`
  background: ${props => props.active ? 'red' : 'yellow'};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
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
    console.log(counter)
    // mark tempo with different sound when counter is 0
    if (canTicking){
      if (counter % tempo === 0) {
        new Audio(metronomeSoundUp).play()
      } else {
        new Audio(metronomeSound).play()
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
        this.makeTick, (60 / bpm) * 1000
      );
      this.setState({
        counter: 0,
        bpm,
      })
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
      console.log('stop:', canTicking)
      clearInterval(this.timeInterval);
      this.setState({ 
        canTicking: false,
        counter: 0,
      })
    } else {
      console.log('start:', canTicking)
      this.timeInterval = setInterval(
        this.makeTick, (60 / bpm) * 1000
      );
      this.setState({
        canTicking: true,
        counter: 0,
      });
    }
  }

  render() {
    const { bpm, canTicking, tempo, counter } = this.state;
    return (
      <MetronomeWrapper>
        <Slider 
          type="range" 
          min="30" 
          max="300" 
          value={bpm} 
          onChange={this.handleBPMInput}
          />
        <div>{bpm} BPM</div>
        <Tempo 
          value={tempo}
          onChange={this.handleTempoInput}
          />
        <button onClick={this.handleTick}>{canTicking ? 'Off' : 'On'}</button>
        { counter === 1 ? <LightMarker active /> : <LightMarker /> }
      </MetronomeWrapper>
    )
  }
}

