import React from "react";
import styled from "styled-components/macro";
import HeroSrc from "./images/bullseye-logo.jpg";
import TeenyBurger from "./images/TeenyBurger.svg";
import TeenyHeart from "./images/TeenyHeart.svg";
import DropDown from "./images/DropDown.png";
import CircleSun from "./images/CircleSun.svg";
import PlayImage from "./images/Play.svg";

import TopSearch from "./TopSearch";
import { BiPlayCircle, BiPauseCircle, BiMenu } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import TestMenu from "./TestMenu";
import PlayerHTML from "./PlayerHTML";

import { getMP3PlayerState } from "./reducers";

import {
  recordMP3PlayerState,
  recordTranslationMP3PlayerState,
} from "./actions";

import {
  COLORS_SHOPIFY_YELLOW_PALLETE,
  COLORS_SHOPIFY_BLUE_PALLETE,
  COLORS_SHOPIFY_GREYS_PALLETE,
} from "./constants.js";
import { MP3_PLAYER_STATES, TRANSLATION_MP3_PLAYER_STATES } from "./constants";
import useResizeAware from "react-resize-aware";

function PlayerFigma() {
  let mp3PlayerState = useSelector(getMP3PlayerState);
  const dispatch = useDispatch();
  const [resizeListenerTop, sizes] = useResizeAware();

  return (
    <Wrapper>
      <Player>
        <CircleSunDiv
          image_source={CircleSun}
          alt="Circle Background behind play button"
        >
          <PlayerTriangleImgFlex>
            <PlayImageDiv src={PlayImage}></PlayImageDiv>
          </PlayerTriangleImgFlex>
        </CircleSunDiv>
        <ProgressBarDiv></ProgressBarDiv>
      </Player>
    </Wrapper>
  );
}

const ProgressBarDiv = styled.div`
  flex-shrink: 10;
`;

const CircleSunDiv = styled.div`
  width: 115px;
  height: 115px;
  background: url("${(props) => props.image_source}");
  background-size: cover;
  border-radius: 5px;
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

const Wrapper = styled.div`
  max-width: 900px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

export default PlayerFigma;
