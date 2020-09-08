import React from "react";
import "./App.css";
import Player2 from "./Player2.js";
import Transcript from "./Transcript.js";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { isMobile } from "react-device-detect";

function App() {
  React.useEffect(() => {
    console.log("app");
    // speechSynthesis.addEventListener("voiceschanged", function () {
    //   let voices_new = speechSynthesis.getVoices();
    //   console.log(voices_new);

    // });
  }, []);

  if (isMobile) {
    return (
      <div>
        Mobile site coming soon! Soon as in one day. In the meantime, check out
        the{" "}
        <a href={"https://david-elliott-shopify-portfolio.netlify.app/"}>
          story
        </a>{" "}
        of how I made it.
      </div>
    );
  } else {
    return (
      <AppDiv className="App">
        <GlobalStyles></GlobalStyles>
        <AppProvider i18n={enTranslations}>
          <Player2 />
          <Transcript></Transcript>
        </AppProvider>
      </AppDiv>
    );
  }
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
