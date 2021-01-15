import React from "react";
import styled from "styled-components/macro";
import MenuComponent from "../Singles/MenuComponent";
import { useSelector } from "react-redux";

import TeenyBurgerComponent from "../SVGs/TeenyBurgerComponent";
import { Spring, config } from "react-spring/renderprops";

import { getPodcastSelectedToPlay } from "../reducers";

function TopFigma() {
  const [burgerToggle, setBurgerToggle] = React.useState(false);
  let podcastSelected = useSelector(getPodcastSelectedToPlay);

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
        <PodcastLogo
          image_source={podcastSelected.image}
          alt="Podcast Image"
        ></PodcastLogo>
        <PodcastText>
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
            {(sunlightProps) => (
              <div>
                <PodcastEpisodeTitle stroke={sunlightProps.stroke}>
                  {podcastSelected.title}
                </PodcastEpisodeTitle>
                <Spring
                  config={config.stiff}
                  from={{
                    height: toggle ? "85px" : "40px",
                  }}
                  to={{
                    height: toggle ? "40px" : "85px",
                  }}
                >
                  {(props) => (
                    <TextAndDownArrow>
                      <PodcastEpisodeDescription height={props.height}>
                        {podcastSelected.description}
                      </PodcastEpisodeDescription>
                      {toggle ? <Elipses>...</Elipses> : <Elipses></Elipses>}
                    </TextAndDownArrow>
                  )}
                </Spring>
              </div>
            )}
          </Spring>
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
                    width: toggle ? 0 : 135,
                    height: toggle ? 0 : 150,
                    paddingLeft: toggle ? 0 : 5,
                  }}
                  to={{
                    width: toggle ? 135 : 0,
                    height: toggle ? 150 : 0,
                    paddingLeft: toggle ? 5 : 0,
                  }}
                  // onRest={reportSize}
                >
                  {(props) => (
                    <Menu style={props}>
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

const Menu = styled.div`
  overflow: hidden;
`;

const PodcastEpisode = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`;

// const TitleAndHeart = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;
const PodcastText = styled.div`
  padding-left: 20px;
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

  @media (max-width: 800px) {
    line-height: 100%;
    text-align: left;
    padding-top: 2px;
  }

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

  @media (max-width: 800px) {
    font-size: 15px;
    line-height: 110%;
  }
`;

const PodcastLogo = styled.div`
  height: 170px;
  width: 180px;
  background: url("${(props) => props.image_source}");
  background-size: contain;
  background-position: top;

  border-radius: 15px;

  @media (max-width: 800px) {
    width: 120px;
    border-radius: 5px;
    background-repeat: no-repeat;
  }
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
  border: transparent;
  outline: none;
  height: 20px;
  :hover {
    background-color: transparent;
    cursor: pointer;
  }
`;

const BurgerIcon = styled.div`
  /* SUNRISE / Light Charcoal */
  padding-left: 5px;
  align-self: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TopFigma;
