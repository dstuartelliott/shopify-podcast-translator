import React from "react";
// import styled from "styled-components/macro";
import styled from "styled-components/macro";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import PodcastListingSearch from "./PodcastListingSearch";

import "focus-visible";

import { PlayerContext } from "../Contexts/PlayerContext";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "../actions";

import { markEnglishAsPlaying, changeTranslation } from "../actions";
import Player from "../Player";

import TopFigma from "../TopComponents/TopFigma";

function PodcastSearch() {
  //eslint-disable-next-line
  const dispatch = useDispatch();

  const playerContext = React.useContext(PlayerContext);

  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));

    async function getPodcasts() {
      let podcasts = await playerContext.getTopPodcastsFromItunes();
      console.log(podcasts);
    }
    getPodcasts();
    // eslint-disable-next-line
  }, []);

  return (
    <FleXApp className="App">
      <AppProvider i18n={enTranslations}>
        <TopDivs>
          <PlayerAtTop>
            <TopFigma></TopFigma>
            <Player />
          </PlayerAtTop>

          <ScrollBox>
            <PodcastListingSearch />
          </ScrollBox>
        </TopDivs>
      </AppProvider>
    </FleXApp>
  );
  // }
}

const ScrollBox = styled.div`
  background-color: white;
  z-index: 2;
  /* overflow-y: scroll;
  max-width: 960px;
  transform: translateX(-50px); 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  bottom: 20px;
  top: 360px;
  position: absolute; */
`;

const PlayerAtTop = styled.div`
  padding-bottom: 10px;
`;
const TopDivs = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const FleXApp = styled.div`
  min-width: 500px;
  max-width: 900px;
  margin: auto;
`;

export default PodcastSearch;
