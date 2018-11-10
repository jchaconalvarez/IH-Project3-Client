import React, { Component } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  display: grid;
  background-color: #A9A9A9;
  grid-column: 2;
  grid-row: 3;
  margin: 0 2rem 2rem 0;
  /* background-image: 
    repeating-linear-gradient(0deg,transparent,transparent 24px,#ccc 24px,#ccc 24.96px),
    repeating-linear-gradient(-90deg,transparent,transparent 24px,#ccc 24px,#ccc 24.96px);
  background-size: 24.96px 24.96px; 1.012*/
  /* grid-template-rows: 
    1.095rem 0.93rem 0.63rem 0.93rem 1.095rem 1.095rem 0.93rem 0.63rem 0.93rem 0.63rem 0.93rem 1.095rem
    1.095rem 0.93rem 0.63rem 0.93rem 1.095rem 1.095rem 0.93rem 0.63rem 0.93rem 0.63rem 0.93rem 1.095rem
    1.095rem 0.93rem 0.63rem 0.93rem 1.095rem 1.57rem; */
`;

const NotesContainer = styled.div`
  font-size: 1rem;
  color: white;
  display: grid;
  /* line-height: 1.56rem;
  margin: 0.09rem; */
`;

const myStyle = {
  display: 'grid',
  // marginTop: '0.62rem',
  height: '0.93rem',
}

export default class Display extends Component {
  // componentDidMount() {
  //   this.createChild();
  // }

  createChild = () => {
    for (let i = 0; i < 28; i++) { 
      const child = document.createElement('div');
      // child.style.background = 'tomato';
      child.style.height = '0.93rem';
      // child.style.border = '0.1px solid black'
      child.style.boxShadow= '0 0 0 0.01rem inset #353535';
      this.refs.father.appendChild(child);
    }
  }

  render() {
    return (
      <CanvasWrapper>
        <NotesContainer>
          {/* <div style={myStyle} ref='father' /> */}
        </NotesContainer>
      </CanvasWrapper>
    )
  }
}

