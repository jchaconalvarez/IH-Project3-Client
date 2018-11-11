import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled.button`
  grid-row: 4;
  width: 30%;
  padding: 1rem 0;
  border-radius: 5px;
  background: #0F8FAB;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
`;

const Back = ({ history }) => {
  return (
    history.length > 1 && <Btn onClick={history.goBack}>Go back</Btn>
  );
};

export default withRouter(Back);
