import React from "react";
import "./App.css";
// import styled from "styled-components/macro";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

import TopFigma from "./TopFigma";
import TopSearch from "./TopSearch";
import Player from "./Player";

import Scrolltext from "./Scrolltext";

import "focus-visible";

import { PlayerContext } from "./PlayerContext";
import { DatabaseContext } from "./DatabaseContext";
import useResizeAware from "react-resize-aware";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "./actions";

import { getHamburgerSize } from "./reducers";

import { markEnglishAsPlaying, changeTranslation } from "./actions";

function PodcastEpisodeHome() {
  //eslint-disable-next-line
  const dispatch = useDispatch();

  let hamburgerSize = useSelector(getHamburgerSize);

  // const customReporter = (target) => ({
  //   clientWidth: target != null ? target.clientWidth : null,
  // });
  const playerContext = React.useContext(PlayerContext);
  const databaseContext = React.useContext(DatabaseContext);
  const [resizeListener, sizesTop] = useResizeAware();
  // const [resizeAppListener, sizesApp] = useResizeAware();

  //test

  React.useEffect(() => {
    console.log("hamgurber size");
    console.log(sizesTop);
    // eslint-disable-next-line
  }, [hamburgerSize]);

  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));
  }, []);

  return (
    <FleXApp className="App">
      <AppProvider i18n={enTranslations}>
        <TopDivs>
          {/* {resizeListener} */}

          <TopFigma />
          <Player />
          <TopSearch></TopSearch>
        </TopDivs>
        <Scrolltext></Scrolltext>
      </AppProvider>
    </FleXApp>
  );
  // }
}

const TopDivs = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const FlexElements = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  height: 100%;
`;

const FleXApp = styled.div`
  min-width: 500px;
  max-width: 900px;
  margin: auto;
`;
const TopDiv = styled.div`
  background-color: transparent;
`;

const BottomElement = styled.div`
  background-color: blue;
  bottom: 0px;
  position: absolute;
`;
const TopAndPlayer = styled.div``;

const ScrollDiv = styled.div`
  background-color: red;
`;

const FocusVisible = styled.div`
  &.js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }
  &.js-focus-visible .focus-visible {
    outline: none;
    border: 3px solid #528deb;
  }
`;

export default PodcastEpisodeHome;
