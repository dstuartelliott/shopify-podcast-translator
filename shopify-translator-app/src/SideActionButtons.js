import React from "react";

import styled, { keyframes } from "styled-components";

import StarComponent from "./SVGs/StarComponent";

function SideActionsButtons({ sentenceUUID, StarCircleSize }) {
  function favourClip(event) {
    console.log("favourClip");

    console.log(event);
    console.log({ sentenceUUID });
  }

  return (
    <ActionButtons>
      <StarClipButton onClick={favourClip}>
        <StarComponent
          width={StarCircleSize}
          height={StarCircleSize}
        ></StarComponent>
      </StarClipButton>
    </ActionButtons>
  );
}

const ActionButtons = styled.div`
  width: 50px;
  position: absolute;
  padding-top: 15px;
  display: flex;
`;

const StarClipButton = styled.button`
  background-color: transparent;
  border: transparent;
  :hover {
    cursor: pointer;
  }
`;

export default SideActionsButtons;
