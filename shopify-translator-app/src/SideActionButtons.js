import React from "react";

import styled, { keyframes } from "styled-components";

import StarComponent from "./SVGs/StarComponent";
import { addFaveSentenceClip } from "./actions";
import { useDispatch } from "react-redux";

function SideActionsButtons({ sentenceUUID, StarCircleSize }) {
  const dispatch = useDispatch();

  function favourClip(event) {
    console.log("favourClip");

    console.log(event);
    console.log({ sentenceUUID });
    dispatch(addFaveSentenceClip({ sentenceUUID }));
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
