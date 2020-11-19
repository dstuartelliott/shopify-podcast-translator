import React from "react";

import styled, { keyframes } from "styled-components";

import LoadingArrowsComponent from "../SVGs/LoadingArrowsComponent";

function SpinnerJustKF() {
  return (
    <Wrapper>
      <AnimationDiv>
        <LoadingArrowsComponent></LoadingArrowsComponent>
      </AnimationDiv>
    </Wrapper>
  );
}

const spin = keyframes`
  
  
  to {
    transform: rotate(360deg);

  }
`;
const Wrapper = styled.div`
  padding-bottom: 10px;
`;

const AnimationDiv = styled.div`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1900ms linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default SpinnerJustKF;
