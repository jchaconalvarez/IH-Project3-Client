import React from 'react';
import styled from 'styled-components';

const Sheet = styled.div`
  background-color: #CCC;
  width: 100%;
  color: white;
  font-size: 2rem;
  display: grid;
  justify-items: center;
`;

export default function MusicSheet(props) {
  return (
    <Sheet>
      <div>{props.children}</div>
    </Sheet>
  )
}
