import React, { Component } from 'react';
import styled from 'styled-components';

const ChronoContainer = styled.div`
  grid-area: chrono;
  width: 18rem;
`;

const Clock = styled.div`
  /* text-align: start; */
  padding-left: 2rem;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.5rem;
  background: #353535;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(#6B6A6A 20%, #4C4C4C 80%) 1 100%;
  padding: 0.3rem;
  padding-left: 3rem;
  overflow: hidden;
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

export default class Chronometer extends Component {
  state = {
    currentCount: 0,
    canStartCount: true,
  }

  componentDidMount() {
    this.handleStop();
  }

  runTime() {
    let { currentCount } = this.state;
    currentCount += 1;
    this.setState({ currentCount });
  }

  // IDEA:
  // await 3 sec before start to rec??
  // setTimeout(() => { /*setinterval here*/ }, 3000);

  handleStart() {
    const { canStartCount } = this.state;
    if (canStartCount) {
      this.timerInterval = setInterval(() => this.runTime(), 10);
      this.setState({ canStartCount: false });
    } else {
      clearInterval(this.timerInterval);
      this.setState({ canStartCount: true });
    }
  }

  handleStop() {
    clearInterval(this.timerInterval);
    this.setState({ currentCount: 0, canStartCount: true });
  }

  formatValues(value) {
    return value < 10 ? '0' + value : value;
  }

  transformTime() {
    const { currentCount } = this.state;
    let minutes = Math.floor(currentCount / 6000);
    const seconds = Math.floor((currentCount / 100) % 60);
    const miliseconds = Math.floor(currentCount % 100);

    if (minutes === 100) {
      minutes = 0;
      this.setState({ currentCount: 0 });
    }

    return {
      minutes: this.formatValues(minutes),
      seconds: this.formatValues(seconds),
      miliseconds: this.formatValues(miliseconds),
    };
  }

  render() {
    const { minutes, seconds, miliseconds } = this.transformTime();
    const { canStartCount } = this.state;
    const { isRecording } = this.props;
    return (
      <ChronoContainer>
        <Clock>
          {minutes} : {seconds} : {miliseconds }
        </Clock>
        {isRecording && canStartCount ? this.handleStart() : ''}
        {!isRecording && !canStartCount ? this.handleStart() : ''}
      </ChronoContainer>
    );
  }
}
