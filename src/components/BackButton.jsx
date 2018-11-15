import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled.button`
  grid-row: 4;
  padding: 0.5rem 3rem;
  border-radius: 5px;
  background: transparent;
  border: 2px solid #0F8FAB;
  font-size: 1.75rem;
  font-weight: 500;
  color: #0F8FAB;
`;

const Back = ({ history }) => {
  return (
    history.length > 1 && <Btn onClick={history.goBack}>GO BACK</Btn>
  );
};

export default withRouter(Back);
