import React from 'react';
import styled from 'styled-components';

const Sheet = styled.div`
  grid-column: 1;
  grid-row: 2 / 9;
  order: 1;
  transform: rotate(0deg);
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 1fr 8fr 2fr;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  background: repeating-linear-gradient(#CCC 0, #CCC 5%, #FFFEEA 0, #FFFEEA 50%) 0 / 50px 50px;
`;

const SheetTwo = styled.div`
  grid-column: 1;
  grid-row: 2;
  transform: rotate(-2deg);
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  background: repeating-linear-gradient(#CCC 0, #CCC 5%, #FFFEEA 0, #FFFEEA 50%) 0 / 50px 50px;
`;

const SheetThree = styled.div`
  grid-column: 1;
  grid-row: 2;
  transform: rotate(3deg);
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  background: repeating-linear-gradient(#CCC 0, #CCC 5%, #FFFEEA 0, #FFFEEA 50%) 0 / 50px 50px;
`;

const NotesContainer = styled.p`
  grid-column: 2;
  grid-row: 2;
  font-size: 1.5rem;
`;

const MusicSheet = (props) => {
  return (
    <React.Fragment>
      <SheetTwo />
      <SheetThree />
      <Sheet>
        <NotesContainer>
          { props.children }
        </NotesContainer>
      </Sheet>
    </React.Fragment>
  );
}

export default MusicSheet;
