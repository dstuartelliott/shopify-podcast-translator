import React from "react";

import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

import StarComponent from "./SVGs/StarComponent";
import StarComponentSelected from "./SVGs/StarComponentSelected";

import { addFaveSentenceClip } from "./actions";
import { useDispatch } from "react-redux";

import { getSavedFaceSentences } from "./reducers";

function SideActionsButtons({ sentenceUUID, StarCircleSize }) {
  const dispatch = useDispatch();
  let fave_clips = useSelector(getSavedFaceSentences);

  function favourClip(event) {
    console.log("favourClip");

    console.log(event);
    console.log({ sentenceUUID });

    dispatch(addFaveSentenceClip(sentenceUUID));
  }

  return (
    <ActionButtons>
      {fave_clips !== undefined && fave_clips.includes(sentenceUUID) ? (
        <StarClipButton onClick={favourClip}>
          <StarComponentSelected
            width={StarCircleSize}
            height={StarCircleSize}
          ></StarComponentSelected>
        </StarClipButton>
      ) : (
        <StarClipButton onClick={favourClip}>
          <StarComponent
            width={StarCircleSize}
            height={StarCircleSize}
          ></StarComponent>
        </StarClipButton>
      )}
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

const StarClipButtonHighlighted = styled.button`
  background-color: red;
  border: transparent;
  :hover {
    cursor: pointer;
  }
`;

export default SideActionsButtons;
