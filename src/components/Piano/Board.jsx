import React, { Component } from 'react';
import styled from 'styled-components';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';

const BoardStyle = styled.div`
  width: 700px;
  height: 200px;
  padding: 60px 15px 15px;
  background-color: #f9d423;
  border-radius: 12px;
  box-shadow: 0 8px 0 0 #E2BE09;
`;

const WhiteKeysGroup = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
`;

const BlackKeysGroup = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 20px 70px 20px 20px 70px 20px 70px 20px 20px 20px;
  grid-column-gap: 30px;
`;

export default class Board extends Component {
  render() {
    return (
      <React.Fragment>
        <BoardStyle>
          <WhiteKeysGroup>
            <WhiteKey id="C2" />
            <WhiteKey id="D2" />
            <WhiteKey id="E2" />
            <WhiteKey id="F2" />
            <WhiteKey id="G2" />
            <WhiteKey id="A2" />
            <WhiteKey id="B2" />
            <WhiteKey id="C3" />
            <WhiteKey id="D3" />
            <WhiteKey id="E3" />
            <WhiteKey id="F3" />
            <WhiteKey id="G3" />
            <WhiteKey id="A3" />
            <WhiteKey id="B3" />
          </WhiteKeysGroup>
          <BlackKeysGroup>
            <BlackKey id="C#2" />
            <BlackKey id="D#2" />
            <BlackKey id="F#2" />
            <BlackKey id="G#2" />
            <BlackKey id="A#2" />
            <BlackKey id="C#3" />
            <BlackKey id="D#3" />
            <BlackKey id="F#3" />
            <BlackKey id="G#3" />
            <BlackKey id="A#3" />
          </BlackKeysGroup>
        </BoardStyle>
      </React.Fragment>
    );
  };
};
