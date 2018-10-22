import React, { Component } from 'react';
import styled from 'styled-components';

const Key = styled.div`
  border-top: 6px solid #E2BE09;
  border-radius: 0 0 5px 5px;
  width: 50px;
  height: 158px;
  background: #F8F8F8;
  box-shadow:
    0 0 0 1px inset #D3D3D3,
    0 8px #D3D3D3;

  &:active {
  box-shadow: 0 8px #F8F8F8;
}
`;

export default class WhiteKey extends Component {
  render() {
    return (
      <React.Fragment>
        <Key />
      </React.Fragment>
    );
  };
};
