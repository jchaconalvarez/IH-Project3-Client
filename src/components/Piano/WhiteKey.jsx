import styled from 'styled-components';

const WhiteKey = styled.div`
  background: ${props => props.active ? 'tomato' : '#F8F8F8'};
  border-radius: .2rem 0 0 .2rem;
  width: 4.93rem; /*79px*/
  height: 1.56rem; /*25px*/
  box-shadow:
    0 0 0 0.06rem inset #D3D3D3, 
    -0.25rem 0 0 0 #D3D3D3;
  /* justify-self: end; */

  &:active {
    box-shadow: 
      -0.2rem 0 0 0 #F8F8F8;
  }

  @media (max-width: 768px) {
    width: calc(4.93rem/2);
  }
`;

export default WhiteKey;
