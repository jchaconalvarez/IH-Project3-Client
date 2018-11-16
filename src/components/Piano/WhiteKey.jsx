import styled from 'styled-components';

const WhiteKey = styled.div`
  border-left: 5px solid #0F8FAB;
  margin-right: 0.2rem;
  background: ${props => props.active ? '#DBA112' : '#F8F8F8'};
  border-radius: 0 .5rem .5rem 0;
  width: 6.5rem;
  border-left: 5px solid #0F8FAB;
  height: ${
    props => props.note === 64
    || props.note === 76
    ? '3.375': '3.25'
  };
  box-shadow:
    0 0 0 0.06rem inset #BABABA,
    0.25rem 0 0 0 #BABABA;

  &:active {
    box-shadow:
      0.2rem 0 0 0 #F8F8F8;
  }

  @media (max-width: 768px) {
    width: calc(4.93rem/2);
  }
`;

export default WhiteKey;
