import styled from 'styled-components';

const BlackKey = styled.div`
  border-left: 5px solid #0F8FAB;
  background: ${props => props.active ? '#DBA112' : '#4C4C4C'};
  border-radius: 0 .2rem .2rem 0;
  width: 3rem;
  height: 1.75rem;
  box-shadow:
  0 0 0 0.06rem inset #353535,
  0.2rem 0 0 0 #353535;

  &:active {
    box-shadow:
    0.2rem 0 0 0 #4C4C4C;
  }

  @media (max-width: 768px) {
    width: calc(2.65rem/2);
  }
`;

export default BlackKey;
