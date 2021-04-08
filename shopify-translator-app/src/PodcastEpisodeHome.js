import React from "react";
import "./App.css";
// import styled from "styled-components/macro";
import styled from "styled-components/macro";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";

import TopFigma from "./TopComponents/TopFigma";
import TopSearch from "./TopComponents/TopSearch.js";
import PlayerAudioContext from "./PlayerAudioContext";

import ScrolltextWSB from "./ScrolltextWSB";

import "focus-visible";

import { getPodcastSelectedToPlay } from "./reducers";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "./actions";

import { markEnglishAsPlaying, changeTranslation } from "./actions";

function PodcastEpisodeHome() {
  //eslint-disable-next-line
  const dispatch = useDispatch();
  let podcastSelected = useSelector(getPodcastSelectedToPlay);

  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));
    //eslint-disable-next-line
  }, []);

  return (
    <FleXApp className="App">
      <AppProvider i18n={enTranslations}>
        <PlayerAudioContext />

        <TopDivs>
          <TopFigma />
          {podcastSelected.title ===
          "NFTs: Blockchain-Powered Art, Trading Cards, Music, and More with Aftab Hossain" ? (
            <TopSearch />
          ) : (
            <div></div>
          )}
        </TopDivs>

        <ScrolltextWSB></ScrolltextWSB>
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

const FleXApp = styled.div`
  max-width: 900px;
`;

export default PodcastEpisodeHome;
