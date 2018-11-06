import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  cursor: pointer;
  width: 60px;
  height: 30px;
  text-align: center;
  text-shadow: 0 1px #353535;
  color:#F8F8F8;
  border: 1px solid #6B6A6A;
  border-radius: 3px;
  background: linear-gradient(#6B6A6A,#4C4C4C);

  &:active {
    color: #D3D3D3;
    background:#4C4C4C;
    box-shadow: inset 0 0 5px 2px rgba(53,53,53,.5);
  }
`;

export default function BtnControl(props) {
  return <Btn type="button">{props.children}</Btn>
}
