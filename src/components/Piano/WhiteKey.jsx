import styled from 'styled-components';

const WhiteKey = styled.div`
  background: ${props => props.active ? 'tomato' : '#F8F8F8'};
  border-radius: 0 .5rem .5rem 0;
  width: 6.5rem; /*79px*/
  /* height: 2rem; 25px */
  border-left: 5px solid #0F8FAB;
  height: ${
    props => props.note === 40
    || props.note === 43
    || props.note === 47
    ? '3.375': '3.25'
  };
  box-shadow:
    0 0 0 0.06rem inset #D3D3D3,
    0.25rem 0 0 0 #D3D3D3;
  /* justify-self: end; */

  &:active {
    box-shadow:
      0.2rem 0 0 0 #F8F8F8;
  }

  @media (max-width: 768px) {
    width: calc(4.93rem/2);
  }
`;

export default WhiteKey;
