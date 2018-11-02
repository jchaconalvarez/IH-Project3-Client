import styled from 'styled-components';

const BlackKey = styled.div`
  background: ${props => props.active ? 'tomato' : '#4C4C4C'};
  border-radius: 0.2rem 0 0 0.2rem;
  width: 2.65rem; /*42,5px*/
  height: 0.93rem; /*15px*/
  box-shadow:
  0 0 0 0.06rem inset #353535, 
  -0.2rem 0 0 0 #353535; 
  /* justify-self: end; */

  &:active {
    box-shadow:
    -0.2rem 0 0 0 #4c4c4c;
  }

  @media (max-width: 768px) {
    width: calc(2.65rem/2);
  }
`;

export default BlackKey;
