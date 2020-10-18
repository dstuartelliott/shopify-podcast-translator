import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero_small.jpg";

import TopSearch from "./TopSearch";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import { getMP3PlayerState } from "./reducers";

import {
  recordMP3PlayerState,
  recordTranslationMP3PlayerState,
} from "./actions";

import { COLORS_SHOPIFY_YELLOW_PALLETE } from "./constants.js";
import { MP3_PLAYER_STATES, TRANSLATION_MP3_PLAYER_STATES } from "./constants";

function Top() {
  let mp3PlayerState = useSelector(getMP3PlayerState);
  const dispatch = useDispatch();

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
      <HeroDiv>
        <ImageDiv>
          <HeroImgMB image_source={HeroSrc}></HeroImgMB>
        </ImageDiv>
        <PlayButton onClick={playButtonHit}>
          {mp3PlayerState === MP3_PLAYER_STATES.PLAYING ? (
            <BiPauseCircle size={40} />
          ) : (
            <BiPlayCircle size={40} />
          )}
        </PlayButton>

        <SummaryDiv>
          <TitleAndSearch>
            <TitleText>
              The Pre-Launch Strategies of a Million-Dollar Brand
            </TitleText>

            <TopSearch></TopSearch>
          </TitleAndSearch>
          <SummaryText>
            Making it easier to keep track of daily hydration goals, Emily Chong
            and Nathan Chan started Healthish and created sleek water bottles
            with timestamps. In this episode of Shopify Masters, we chat with
            Nathan and Emily on product development and building their business
            through influencer marketing.
          </SummaryText>
        </SummaryDiv>
      </HeroDiv>
    </Wrapper>
  );
}

const PlayButton = styled.button`
  border: 0px;
  background-color: transparent;
  color: red;
`;

const SummaryText = styled.div`
  font-size: 13px;
  font-weight: 300;
  padding-top: 10px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const HeroDiv = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 500;
  justify-content: flex-start;
  padding: 10px;
  flex-direction: row;
  border: 2px solid ${COLORS_SHOPIFY_YELLOW_PALLETE.Yellow};

  align-content: flex-start;

  @media (max-width: 600px) {
    font-size: 15px;
    font-weight: 500;
    justify-content: flex-start;
    padding: 10px;
    flex-direction: row;
    height: 100px;
    border: 2px solid #eec200;
  }
`;

const ImageDiv = styled.div`
  margin-right: 0px;
  /* background-color: blue; */
  min-width: 150px;
`;

const TitleAndSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SummaryDiv = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  font-size: 15px;
  max-width: 700px;
  flex-grow: 2;

  @media (min-width: 600px) {
  }
`;

const TitleText = styled.div`
  width: 200px;
  padding-right: 5px;
  @media (min-width: 600px) {
    /* background-color: red; */
    align-self: flex-start;
    min-width: 200px;
  }
`;

const HeroImgMB = styled.div`
  background-image: url("${(props) => props.image_source}");
  min-height: 70px;
  max-width: 220px;
  display: block;
  background-position: left 10px top 5px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  padding: 10px;
  max-width: 900px;
`;

export default Top;
