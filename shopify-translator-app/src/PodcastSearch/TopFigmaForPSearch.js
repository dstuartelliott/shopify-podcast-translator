import React from "react";
import styled from "styled-components/macro";
import HeroSrc from "../images/bullseye-logo.jpg";
import TeenyHeart from "../images/TeenyHeart.svg";
import DropDown from "../images/DropDown.png";

import TeenyBurgerComponent from "../TeenyBurgerComponent";
import { Spring, config } from "react-spring/renderprops";
import MenuComponent from "../MenuComponent";
const MenuItems = ["Login", "Search For Podcasts", "Starred Clips", "About"];

function TopFigma() {
  const [burgerToggle, setBurgerToggle] = React.useState(false);

  const [toggle, setToggle] = React.useState(false);

  return (
    <Wrapper>
      {/* <MenuTitleConstant>How People </MenuTitleConstant> */}
      <Spring
        // config={config.gentle}
        config={{ tension: 170, friction: 40, precision: 0.01, velocity: 0 }}
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
                onClick={() => setToggle(!toggle)}
              ></BurgerButton>
              <TeenyBurgerComponent
                stroke={props.stroke}
              ></TeenyBurgerComponent>
            </BurgerIcon>
          </MenuHeader>
        )}
      </Spring>
      <PodcastEpisode>
        <PodcastText>
          <TitleAndHeart>
            <Spring
              // config={config.gentle}
              config={{
                tension: 170,
                friction: 171,
                precision: 0.01,
                velocity: 0,
              }}
              from={{ stroke: burgerToggle ? "#37313C" : "#FDC500" }}
              to={{ stroke: burgerToggle ? "#FDC500" : "#37313C" }}
            >
              {(props) => (
                <PodcastEpisodeTitle stroke={props.stroke}>
                  Bullseye with Jesse Thorn: Padma Lakshmi
                </PodcastEpisodeTitle>
              )}
            </Spring>
          </TitleAndHeart>
        </PodcastText>
        <MenuWrapper>
          <Spring
            // config={config.gentle}
            config={{
              tension: 170,
              friction: 171,
              precision: 0.01,
              velocity: 0,
            }}
            from={{ stroke: burgerToggle ? "#37313C" : "#FDC500" }}
            to={{ stroke: burgerToggle ? "#FDC500" : "#37313C" }}
          >
            {(props) => (
              <div>
                <Spring
                  force
                  config={{ tension: 2000, friction: 100, precision: 1 }}
                  from={{
                    width: toggle ? 0 : 180,
                    height: toggle ? 0 : "auto",
                    paddingLeft: toggle ? 0 : 5,
                  }}
                  to={{
                    width: toggle ? 180 : 0,
                    height: toggle ? "auto" : 0,
                    paddingLeft: toggle ? 5 : 0,
                  }}
                  // onRest={reportSize}
                >
                  {(props) => (
                    <Menu style={props}>
                      {/* {resizeListener} */}
                      <MenuComponent></MenuComponent>
                    </Menu>
                  )}
                </Spring>
              </div>
            )}
          </Spring>
        </MenuWrapper>
      </PodcastEpisode>
    </Wrapper>
  );
}

const MenuWrapper = styled.div`
  margin-top: -3px;
`;

const InternalMenu = styled.div`
  background-color: #f1ebf5;
  background: linear-gradient(45deg, #f1ebf5, #fcda71);
  border-radius: 5px;
`;
const Menu = styled.div`
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding-top: 5px;
  padding-right: 10px;
  height: 25px;
  color: #20404e;
  :hover {
    color: #091216;
    cursor: hand;
  }
  text-align: right;
`;

const LastMenuItem = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  text-align: right;

  height: 20px;
  color: #20404e;
  :hover {
    color: #091216;
    cursor: hand;
  }
`;

const PodcastEpisode = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: flex-end;
`;

const TitleAndHeart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PodcastText = styled.div`
  padding-left: 1px;
  flex-shrink: 10;
`;

const TextAndDownArrow = styled.div`
  display: flex;
  flex-direction: row;
`;
const PodcastEpisodeDescription = styled.div`
  font-family: Avenir Next;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  padding-top: 5px;
  padding-right: 5px;
  flex: 1;
  text-align: justify;
  height: ${(props) => props.height};

  overflow-y: hidden;

  /* SUNRISE / Text Grey */

  color: #605866;
`;

const Elipses = styled.div`
  align-self: flex-end;
  margin-left: -3px;
`;

const PodcastEpisodeTitle = styled.div`
  font-family: Avenir Next;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 120%;
  /* identical to box height, or 36px */

  /* SUNRISE / Charcoal */
  background: radial-gradient(circle at 0%, #37313c, ${(props) => props.stroke})
    no-repeat;
  -webkit-background-clip: text;
  background-clip: text;

  -webkit-text-fill-color: transparent;

  color: #37313c;
`;

const PodcastLogo = styled.div`
  width: 120px;
  height: 120px;
  background: url("${(props) => props.image_source}");
  background-size: contain;
  background-position: center;

  border-radius: 5px;
`;

const MenuHeader = styled.div`
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MenuTitle = styled.div`
  /* B */

  font-family: Avenir Next;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 22px */
  align-self: center;

  background: linear-gradient(45deg, #37313c, ${(props) => props.stroke})
    no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BurgerButton = styled.button`
  background-color: transparent;
  position: absolute;
  outline: none;

  border: transparent;
  height: 20px;
  :hover {
    background-color: transparent;
  }
`;

const BurgerIcon = styled.div`
  /* SUNRISE / Light Charcoal */
  padding-left: 5px;
  align-self: flex-start;
`;

const TeenyHeartIcon = styled.div`
  width: 23px;
  height: 23px;
  background-image: url("${(props) => props.image_source}");
  background-size: contain;
  background-repeat: no-repeat;
  align-self: flex-start;
  padding-bottom: 3px;
  margin-left: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TopFigma;
