import React from "react";

import styled, { keyframes } from "styled-components";

import { Icon } from "react-icons-kit";

import { loader } from "react-icons-kit/feather/loader";

function SpinnerJustKF() {
  return (
    <Wrapper>
      <Icon icon={loader} size={64} />
    </Wrapper>
  );
}

const spin = keyframes`
  
  
  to {
    transform: rotate(360deg);

  }
`;

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1900ms linear infinite;
    transform-origin: 35% 30%;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default SpinnerJustKF;
