import React from "react";
// import styled from "styled-components/macro";
import styled from "styled-components/macro";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import TopFigmaForPSearch from "./TopFigmaForPSearch";
import TopFigma from "../TopFigma";

import PodcastInfoListing from "./PodcastInfoListing";
import { getPodcastShowing } from "../reducers";

import "focus-visible";

import { PlayerContext } from "../PlayerContext";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "../actions";

import { markEnglishAsPlaying, changeTranslation } from "../actions";
import PlayerMinimal from "../PlayerMinimal";

function IndividualPodcast() {
  let podcastShowing = useSelector(getPodcastShowing);

  //eslint-disable-next-line
  const dispatch = useDispatch();
  console.log(podcastShowing);
  const playerContext = React.useContext(PlayerContext);

  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));

    // eslint-disable-next-line
  }, []);

  if (podcastShowing.state !== "loading") {
    return (
      <FleXApp className="App">
        <AppProvider i18n={enTranslations}>
          <TopDivs>
            <PlayerAtTop>
              <TopFigma></TopFigma>
              <PlayerMinimal />
            </PlayerAtTop>
          </TopDivs>
          <PodcastInfoListing
            searchResultItem={podcastShowing.state}
          ></PodcastInfoListing>
        </AppProvider>
      </FleXApp>
    );
  }

  return (
    <FleXApp className="App">
      <AppProvider i18n={enTranslations}>
        <TopDivs>
          <PlayerAtTop>
            <TopFigma></TopFigma>
            <PlayerMinimal />
          </PlayerAtTop>
        </TopDivs>
        No Podcast Present
      </AppProvider>
    </FleXApp>
  );

  // }
}

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

export default IndividualPodcast;
