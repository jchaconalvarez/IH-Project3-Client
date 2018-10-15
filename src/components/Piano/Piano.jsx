import React, { Component } from 'react';
import styled from 'styled-components';
// import Keys from './Keys';
// import Board from './Board';

const Board = styled.div`
  width: 700px;
  height: 200px;
  padding: 60px 15px 15px;
  background-color: #f9d423;
  border-radius: 12px;
  box-shadow: 0 8px 0 0 #E2BE09;
  align-content: center;
`

// const Key = styled.div`
//   border-top: 6px solid #E2BE09;
//   border-radius: 0 0 5px 5px;
// `

const WhiteKeysGroup = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
`

const WhiteKey = styled.div`
  border-top: 6px solid #E2BE09;
  border-radius: 0 0 5px 5px;
  width: 50px;
  height: 185px;
  background: #F8F8F8;
  box-shadow:
    0 0 0 0.5px inset #D3D3D3,
    0 8px #D3D3D3;

  &:active {
  box-shadow:
    0 8px #F8F8F8;
}
`

const BlackKeysGroup = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 20px 70px 20px 20px 70px 20px 70px 20px 20px 20px;
  grid-column-gap: 30px;
`

const BlackKey = styled.div`
  border-top: 6px solid #E2BE09;
  border-radius: 0 0 5px 5px;
  margin-left: 35px;
  width: 30px;
  height: 100px;
  background: #424242;
  box-shadow:
    0 0 0 0.5px inset #353535, 
    0 8px #353535;
  &:active{
   box-shadow:
    0 8px #424242
} 
`

export default class Piano extends Component {
  render() {
    return (
      <Board>
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
      </Board>

    )
  }
}
