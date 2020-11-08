import React from "react";
import styled from "styled-components/macro";
import HeroSrc from "./images/bullseye-logo.jpg";
import TeenyBurger from "./images/TeenyBurger.svg";
import TeenyHeart from "./images/TeenyHeart.svg";
import DropDown from "./images/DropDown.png";

import TeenyBurgerComponent from "./TeenyBurgerComponent";
import CircleSun from "./images/CircleSun.svg";
import PlayImage from "./images/Play.svg";
import { Spring, config } from "react-spring/renderprops";
import TopSearch from "./TopSearch";
import { BiPlayCircle, BiPauseCircle, BiMenu } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import TestMenu from "./TestMenu";

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

function TopFigma() {
  let mp3PlayerState = useSelector(getMP3PlayerState);
  const dispatch = useDispatch();
  const [resizeListenerTop, sizes] = useResizeAware();

  let [burgerStrokeColor, setBurgerStrokeColor] = React.useState("red");

  const [burgerToggle, setBurgerToggle] = React.useState(false);

  function BurgerOver() {
    setBurgerStrokeColor("blue");
  }

  function BurgerLeave() {
    setBurgerStrokeColor("red");
  }
  return (
    <Wrapper>
      {/* <MenuTitleConstant>How People </MenuTitleConstant> */}
      <Spring
        // config={config.gentle}
        config={{ tension: 170, friction: 171, precision: 0.01, velocity: 0 }}
        from={{ stroke: burgerToggle ? "#37313C" : "#FDC500" }}
        to={{ stroke: burgerToggle ? "#FDC500" : "#37313C" }}
      >
        {(props) => (
          <MenuHeader>
            <MenuTitle stroke={props.stroke}>How People Talk</MenuTitle>

            <BurgerIcon>
              <BurgerButton
                onMouseEnter={() => setBurgerToggle(!burgerToggle)}
                onMouseLeave={() => setBurgerToggle(!burgerToggle)}
              ></BurgerButton>
              <TeenyBurgerComponent
                stroke={props.stroke}
              ></TeenyBurgerComponent>
            </BurgerIcon>
          </MenuHeader>
        )}
      </Spring>
      <PodcastEpisode>
        <PodcastLogo image_source={HeroSrc} alt="Podcast Image"></PodcastLogo>
        <PodcastText>
          <TitleAndHeart>
            <PodcastEpisodeTitle>
              Bullseye with Jesse Thorn: Padma Lakshmi
            </PodcastEpisodeTitle>
            <TeenyHeartIcon
              image_source={TeenyHeart}
              alt="Heart Icon"
            ></TeenyHeartIcon>
          </TitleAndHeart>

          <TextAndDownArrow>
            <PodcastEpisodeDescription>
              Padma Lakshmi is a model, actress and the host of Top Chef on
              Bravo. She’s the person telling everyone to pack their knives and
              go home. Her latest television series is Taste the Nation With
              Padma Lakshmi on Hulu. Each episode, Padma travels to a different
              part of the...
            </PodcastEpisodeDescription>
            <TwoImages></TwoImages>
            <DownArrow image_source={DropDown}></DownArrow>
          </TextAndDownArrow>
        </PodcastText>
      </PodcastEpisode>
    </Wrapper>
  );
}

const TwoImages = styled.div``;

const PodcastEpisode = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`;

const TextAndDownArrow = styled.div`
  display: flex;
  flex-direction: row;
`;

const DownArrow = styled.div`
  min-width: 20px;
  background: url("${(props) => props.image_source}");
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 30px;
`;

const TitleAndHeart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PodcastText = styled.div`
  padding-left: 20px;
  flex-shrink: 20;
`;

const PodcastEpisodeDescription = styled.div`
  font-family: Avenir Next;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  padding-top: 5px;
  padding-right: 5px;

  text-align: justify;

  /* SUNRISE / Text Grey */

  color: #605866;
`;

const PodcastEpisodeTitle = styled.div`
  font-family: Avenir Next;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 120%;
  /* identical to box height, or 36px */

  /* SUNRISE / Charcoal */

  color: #37313c;
`;

const PodcastLogo = styled.div`
  width: 120px;
  height: 120px;
  background: url("${(props) => props.image_source}");
  background-size: cover;
  border-radius: 5px;
`;

const MenuHeader = styled.div`
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MenuTitleConstant = styled.div`
  /* B */

  font-family: Avenir Next;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
  padding-right: 4px;
  /* identical to box height, or 22px */

  /* SUNRISE / Charcoal */
  color: transparent;
  // #9198e5
  background-color: #37313c;
  background-clip: text;
`;

const MenuTitle = styled.div`
  /* B */

  font-family: Avenir Next;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
  /* identical to box height, or 22px */

  /* SUNRISE / Charcoal */
  color: transparent;
  // #9198e5
  background: radial-gradient(
    circle at 0%,
    #37313c,
    ${(props) => props.stroke}
  );
  background-clip: text;
`;

const BurgerButton = styled.button`
  background-color: transparent;
  position: absolute;
  height: 20px;
  :hover {
    background-color: transparent;
  }
`;

const BurgerIcon = styled.div`
  /* SUNRISE / Light Charcoal */
  padding-left: 5px;
  align-self: center;
`;

const TeenyHeartIcon = styled.div`
  width: 23px;
  height: 23px;
  background-image: url("${(props) => props.image_source}");
  background-size: contain;
  background-repeat: no-repeat;
  align-self: center;
  padding-bottom: 3px;
  margin-left: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

export default TopFigma;
