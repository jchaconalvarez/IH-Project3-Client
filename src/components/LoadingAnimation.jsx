import React from 'react';
import styled from 'styled-components';

const Bar = styled.span`
  position: absolute;
  width: 2rem;
  height: 0;
  left: 32%;
  bottom: 30%;
  background: linear-gradient(#F0F0F0, #0F8FAB);
  animation: grow 1.5s linear infinite;

  &:nth-child(2) {
    left: 36%;
    animation-delay: .2s;
  }
  &:nth-child(3) {
    left: 40%;
    animation-delay: .3s;
  }
  &:nth-child(4) {
    left: 44%;
    animation-delay: .1s;
  }
  &:nth-child(5) {
    left: 48%;
    animation-delay: .4s;
  }
    &:nth-child(6) {
    left: 52%;
    animation-delay: .2s;
  }
  &:nth-child(7) {
    left: 56%;
    animation-delay: .3s;
  }
  &:nth-child(8) {
    left: 60%;
    animation-delay: .1s;
  }

  @keyframes grow {
    from { height: 40% }
  }
`;


const Loading = () => {
  return (
    <React.Fragment>
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
    </React.Fragment>
  );
};

export default Loading;
