import React from "react";
import styled from "styled-components/macro";
import HeroSrc from "./images/bullseye-logo.jpg";
import TeenyBurger from "./images/TeenyBurger.svg";
import TeenyHeart from "./images/TeenyHeart.svg";
import DropDown from "./images/DropDown.png";
import CircleSun from "./images/CircleSun.svg";
import CircleOver from "./images/circle_over2.svg";
import PauseImage from "./images/pause.svg";

import PlayImage from "./images/Play.svg";

import TopSearch from "./TopSearch";
import { BiPlayCircle, BiPauseCircle, BiMenu } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import TestMenu from "./TestMenu";
import PlayerHTMLFigma from "./PlayerHTMLFigma";

import { getMP3PlayerState } from "./reducers";

import {
  recordMP3PlayerState,
  recordTranslationMP3PlayerState,
} from "./actions";

import { MP3_PLAYER_STATES, TRANSLATION_MP3_PLAYER_STATES } from "./constants";
import useResizeAware from "react-resize-aware";

function Player() {
  let mp3PlayerState = useSelector(getMP3PlayerState);
  const dispatch = useDispatch();
  const [resizeListenerProgressBar, sizes] = useResizeAware();

  function playButtonHit() {
    console.log("hit");
    console.log(mp3PlayerState);

    if (mp3PlayerState === MP3_PLAYER_STATES.PAUSED) {
      dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
      dispatch(
        recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
      );
    } else if (mp3PlayerState === MP3_PLAYER_STATES.PLAYING) {
      {
        dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
        dispatch(
          recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
        );
      }
    }
  }

  return (
    <Wrapper>
      <CircleSunDiv
        image_source={CircleSun}
        image_over_source={CircleOver}
        alt="Circle Background behind play button"
        onClick={playButtonHit}
      >
        <PlayerTriangleImgFlex>
          {mp3PlayerState === MP3_PLAYER_STATES.PLAYING ? (
            <PauseImageDiv src={PauseImage}></PauseImageDiv>
          ) : (
            <PlayImageDiv src={PlayImage}></PlayImageDiv>
          )}
        </PlayerTriangleImgFlex>
      </CircleSunDiv>

      <ProgressBarDiv>
        {resizeListenerProgressBar}
        <PlayerHTMLFigma
          sizeOfJogArea={sizes.width - 115 - 10}
        ></PlayerHTMLFigma>
      </ProgressBarDiv>
    </Wrapper>
  );
}

const PlayButton = styled.button`
  border: 0px;
  background-color: transparent;
  color: red;
`;

const ProgressBarDiv = styled.div`
  background-color: #f1ebf5;
  flex-grow: 4;
  margin-left: 10px;
  border-radius: 10px;
`;

const CircleSunDiv = styled.button`
  width: 115px;
  height: 115px;
  background: url("${(props) => props.image_source}");
  background-size: cover;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  :hover {
    background-color: transparent;
    background: url("${(props) => props.image_over_source}");
    width: 115px;
    height: 115px;
    background-size: cover;
    border-radius: 5px;
  }
`;

const PlayerTriangleImgFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 115px;
  width: 115px;
`;
const PlayImageDiv = styled.img`
  padding-right: 5px;
`;

const PauseImageDiv = styled.img``;

const Wrapper = styled.div`
  max-width: 900px;
  min-width: 500px;
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  align-items: center;
`;

export default Player;
