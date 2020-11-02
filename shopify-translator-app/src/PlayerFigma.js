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

function PlayerFigma() {
  let mp3PlayerState = useSelector(getMP3PlayerState);
  const dispatch = useDispatch();
  const [resizeListenerTop, sizes] = useResizeAware();

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
      <Player>
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
          <PlayerHTMLFigma></PlayerHTMLFigma>
        </ProgressBarDiv>
      </Player>
    </Wrapper>
  );
}

const PlayButton = styled.button`
  border: 0px;
  background-color: transparent;
  color: red;
`;

const ProgressBarDiv = styled.div`
  flex-shrink: 10;
`;

const CircleSunDiv = styled.button`
  width: 115px;
  height: 115px;
  background: url("${(props) => props.image_source}");
  background-size: cover;
  border-radius: 5px;
  :hover {
    background-color: transparent;
    background: url("${(props) => props.image_over_source}");
    width: 115px;
    height: 115px;
    background-size: cover;
    border-radius: 5px;
    /* transform: translate(0%, -3%); */
    transition: 0.3s ease-out;
  }
`;

const Player = styled.div`
  display: flex;
`;

const PlayerTriangleImgFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 115px;
`;
const PlayImageDiv = styled.img`
  padding-left: 5px;
`;

const PauseImageDiv = styled.img``;

const Wrapper = styled.div`
  max-width: 900px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

export default PlayerFigma;
