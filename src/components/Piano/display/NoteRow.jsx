import React from 'react';
import styled from 'styled-components';

const NoteRowStyle = styled.div`
  display: grid;
  height: 1rem;
  background: tomato;
`;

const NoteRow = (props) => {
  return (
    <NoteRowStyle>
      { props.note }
    </NoteRowStyle>
  );
};

export default NoteRow;
