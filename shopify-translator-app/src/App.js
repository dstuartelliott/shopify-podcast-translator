import React from "react";
import "./App.css";
import Player2 from "./Player2.js";
import Transcript from "./Transcript.js";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";

import { updateWindowDimensions } from "./actions";

function App() {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  const dispatch = useDispatch();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    let height_for_text = Math.round(height * 0.66);
    height_for_text = parseInt(height_for_text) + "px";
    return {
      width,
      height,
      height_for_text,
    };
  }

  function handleResize() {
    const { innerWidth: width, innerHeight: height } = window;
    let height_for_text_open = Math.round(height * 0.5);
    let height_for_text_collapsed = Math.round(height * 0.2);

    let height_for_podcast_info_open = Math.round(height * 0.8);

    let height_for_podcast_info_collapsed = Math.round(height * 0.1);

    height_for_text_open = parseInt(height_for_text_open) + "px";
    height_for_text_collapsed = parseInt(height_for_text_collapsed) + "px";
    height_for_podcast_info_open =
      parseInt(height_for_podcast_info_open) + "px";
    height_for_podcast_info_collapsed =
      parseInt(height_for_podcast_info_collapsed) + "px";

    dispatch(
      updateWindowDimensions({
        width,
        height,
        height_for_text_open,
        height_for_text_collapsed,
        height_for_podcast_info_open,
        height_for_podcast_info_collapsed,
      })
    );
  }

  function initWindowSizes() {
    const { innerWidth: width, innerHeight: height } = window;
    let height_for_text_open = Math.round(height * 0.5);
    let height_for_text_collapsed = Math.round(height * 0.2);

    let height_for_podcast_info_open = Math.round(height * 0.8);

    let height_for_podcast_info_collapsed = Math.round(height * 0.1);

    height_for_text_open = parseInt(height_for_text_open) + "px";
    height_for_text_collapsed = parseInt(height_for_text_collapsed) + "px";
    height_for_podcast_info_open =
      parseInt(height_for_podcast_info_open) + "px";
    height_for_podcast_info_collapsed =
      parseInt(height_for_podcast_info_collapsed) + "px";

    dispatch(
      updateWindowDimensions({
        width,
        height,
        height_for_text_open,
        height_for_text_collapsed,
        height_for_podcast_info_open,
        height_for_podcast_info_collapsed,
      })
    );
  }

  React.useEffect(() => {
    console.log("app");
    window.addEventListener("resize", handleResize);

    initWindowSizes();
    // speechSynthesis.addEventListener("voiceschanged", function () {
    //   let voices_new = speechSynthesis.getVoices();
    //   console.log(voices_new);

    // });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // if (isMobile) {
  //   return <div> Mobile version coming soon (like, in a day) </div>;
  // } else {
  return (
    <AppDiv className="App">
      <GlobalStyles></GlobalStyles>

      <AppProvider i18n={enTranslations}>
        <Player2 />
      </AppProvider>
    </AppDiv>
  );
  // }
}

const AppDiv = styled.div``;

const GlobalStyles = createGlobalStyle`
  * {

  }

.nav-items
{
  padding-right: 5px;
}

nav
{
  display: flex;

}

/* Link{
  padding-right: 0px;
  color:green;
  font-size: 50px;

  :visited {
    text-decoration: none;
  }

} */

/* adopted from https://polaris.shopify.com/design/typography#section-display-styles */

displayXlarge
{
  /* font-size: 42px;
  line-height: 44px;
  font-weight: 500; */

  font-size: 27px;
    line-height: 36px;
    font-weight: 500;

  @media (max-width: 800px) {
    font-size: 27px;
    line-height: 36px;
    font-weight: 500;
    }
}

displayLarge
{
  font-size: 28;
  line-height: 32px;
  font-weight: 500;

  @media (max-width: 800px) {
    font-size: 24px;
    line-height: 28px;
    font-weight: 500;
    }
}

displayMedium
{
  font-size: 26px;
  line-height: 32px;
  font-weight: 400;

  @media (max-width: 800px) {
    font-size: 21px;
    line-height: 28px;
    font-weight: 400;
    }
}

displaySmall
{
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;

  @media (max-width: 800px) {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    }
}

heading
{
  font-size: 16px;
line-height: 24px;
font-weight: 500;

  @media (max-width: 800px) {
    font-size: 17px;
line-height: 24px;
font-weight: 500;
    }
}

subHeading
{
  font-size: 12px;
line-height: 16px;
font-weight: 600;
text-transform: uppercase;

  @media (max-width: 800px) {
    font-size: 13px;
line-height: 16px;
font-weight: 600;
text-transform: uppercase;
    }
}

caption
{
  font-size: 12px;
line-height: 16px;
font-weight: 400;

  @media (max-width: 800px) {
    font-size: 13px;
line-height: 20px;
font-weight: 400;
    }
}





`;

export default App;
