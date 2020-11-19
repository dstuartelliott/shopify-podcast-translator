import React from "react";
import "./App.css";
// import styled from "styled-components/macro";
import styled from "styled-components/macro";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { useDispatch } from "react-redux";

import PodcastEpisodeHome from "./PodcastEpisodeHome";
import PodcastSearch from "./PodcastSearch/PodcastSearch.js";
import IndividualPodcast from "./PodcastSearch/IndividualPodcast.js";

import "focus-visible";

// import { DatabaseContext } from "./Contexts/DatabaseContext";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "./actions";

import { markEnglishAsPlaying, changeTranslation } from "./actions";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  //eslint-disable-next-line
  const dispatch = useDispatch();

  // const customReporter = (target) => ({
  //   clientWidth: target != null ? target.clientWidth : null,
  // });
  // const databaseContext = React.useContext(DatabaseContext);
  // const [resizeAppListener, sizesApp] = useResizeAware();

  //test

  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));
    // eslint-disable-next-line
  }, []);

  return (
    <FocusVisible className="js-focus-visible focus-visible">
      <FleXApp className="App">
        <AppProvider i18n={enTranslations}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <PodcastEpisodeHome></PodcastEpisodeHome>
              </Route>
              <Route path="/podcastsearch">
                <PodcastSearch />
              </Route>
              <Route path="/podcast">
                <IndividualPodcast />
              </Route>
            </Switch>
          </BrowserRouter>

          {/* <BottomElement>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
          </BottomElement> */}
        </AppProvider>
      </FleXApp>
    </FocusVisible>
  );
  // }
}

const FleXApp = styled.div`
  min-width: 500px;
  max-width: 900px;
  margin: auto;
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

export default App;
