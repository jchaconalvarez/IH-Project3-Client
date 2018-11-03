import React from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  display: grid;
  background-color: #4C4C4C;
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

const NotesContainer = styled.p`
  grid-row: 1;
  font-size: 0.6rem;
  /* line-height: 1.56rem;
  margin: 0.09rem; */
`;

const Display = (props) => {
  return (
    <CanvasWrapper>
      <NotesContainer>
        { props.children }
      </NotesContainer>
    </CanvasWrapper>
  );
}

export default Display;
