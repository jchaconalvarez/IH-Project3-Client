import React, { Component } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  display: grid;
  background-color: #6B6A6A;
  grid-column: 2;
  grid-row: 3;
  margin: 0 2rem 2rem 0;
  /* background-image: 
    repeating-linear-gradient(0deg,transparent,transparent 24px,#ccc 24px,#ccc 24.96px),
    repeating-linear-gradient(-90deg,transparent,transparent 24px,#ccc 24px,#ccc 24.96px);
  background-size: 24.96px 24.96px; 1.012*/
  grid-template-rows: 
    1.095rem 0.93rem 0.63rem 0.93rem 1.095rem 1.095rem 0.93rem 0.63rem 0.93rem 0.63rem 0.93rem 1.095rem
    1.095rem 0.93rem 0.63rem 0.93rem 1.095rem 1.095rem 0.93rem 0.63rem 0.93rem 0.63rem 0.93rem 1.095rem
    1.095rem 0.93rem 0.63rem 0.93rem 1.095rem 1.57rem;
`;

const NotesContainer = styled.a`
  font-size: 1rem;
  color: white;
  /* line-height: 1.56rem;
  margin: 0.09rem; */
`;

export default class Display extends Component {
  componentDidMount() {
    this.createChild();
  }

  createChild = () => {
    console.log(this.refs.father)
    const child = document.createElement('div');
    child.style.background = 'tomato';
    child.style.width = '1rem';
    child.style.height = '1rem';
    this.refs.father.appendChild(child);
  }

  render() {
    return (
      <CanvasWrapper>
        <NotesContainer>
          <div ref='father' />
        </NotesContainer>
      </CanvasWrapper>
    )
  }
}

