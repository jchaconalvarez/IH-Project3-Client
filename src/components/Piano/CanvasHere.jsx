import React from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  background-color: mediumseagreen;
  grid-column: 2;
  grid-row: 3;
  margin: 0 2rem 2rem 0;
  background-image: 
    repeating-linear-gradient(0deg,transparent,transparent 24px,#ccc 24px,#ccc 24.96px),
    repeating-linear-gradient(-90deg,transparent,transparent 24px,#ccc 24px,#ccc 24.96px);
  background-size: 24.96px 24.96px;

`;

const NotesContainer = styled.p`
  font-size: 1rem;
`;

const CanvasHere = (props) => {
  return (
    <CanvasWrapper>
      <NotesContainer>
        { props.children }
      </NotesContainer>
    </CanvasWrapper>
  );
}

export default CanvasHere;
