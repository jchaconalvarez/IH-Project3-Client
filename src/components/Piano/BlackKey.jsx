import React, { Component } from 'react';
import styled from 'styled-components';

const Key = styled.div`
  border-top: 6px solid #E2BE09;
  border-radius: 0 0 5px 5px;
  margin-left: 35px;
  width: 30px;
  height: 100px;
  background: #494949;
  box-shadow:
    0 0 0 0.5px inset #353535,
    0 8px #353535;
  &:active{
   box-shadow:
    0 8px #494949;
}
`;

export default class BlackKey extends Component {
  render() {
    return (
      <React.Fragment>
        <Key />
      </React.Fragment>
    );
  };
};
