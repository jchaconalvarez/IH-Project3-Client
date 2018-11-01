import React from 'react';
import styled from 'styled-components';

const LoadingBars = styled.div`
  width: 100px;
`;

const Bar = styled.span`
  position: absolute;
  width: 15px;
  height: 0;
  left: 0;
  bottom: calc(100vh/2);
  background: linear-gradient(#F9D423,#EF4957);
  animation: growForMe 1s linear infinite;

  &:nth-child(2) {
    left: 20px;
    animation-delay: .2s;
  }
  &:nth-child(3) {
    left: 40px;
    animation-delay: .3s;
  }
  &:nth-child(4) {
    left: 60px;
    animation-delay: .1s;
  }
  &:nth-child(5) {
    left: 80px;
    animation-delay: .4s;
  }
    &:nth-child(6) {
    left: 100px;
    animation-delay: .2s;
  }
  &:nth-child(7) {
    left: 120px;
    animation-delay: .3s;
  }
  &:nth-child(8) {
    left: 140px;
    animation-delay: .1s;
  }

  @keyframes growForMe {
    from { height: 60px }
  }
`;


const Loading = () => {
  return (
    <LoadingBars>
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
    </LoadingBars>
  );
};

export default Loading;
