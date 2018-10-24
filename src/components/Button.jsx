import React from 'react';
import styled from 'styled-components';

const CardButton = styled.button`
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  width: 100px;
  margin-top: 30%;
  padding: 10px 0;
  border: 0;
  color: white;
  border-radius: 35px;
  background: #F9D423;
  animation: mymove 15s infinite;
  }
    @keyframes mymove {
        50% { background-color: #EF4957; }
  }

  &:focus{
    transform: translateY(2px);
    animation: none !important;
  }
`;

export default function Button(props) {
  return (
    <CardButton type="submit">
      {props.children}
    </CardButton>
  );
}
