import React from 'react';
import styled from 'styled-components';

const Sheet = styled.div`
  background-color: papayawhip;
  width: 100%;
  color: tomato;
  font-size: 2rem;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 0.3rem;
`;

export default function MusicSheet(props) {
  return (
    <Sheet>
      {props.children}
    </Sheet>
  );
}
