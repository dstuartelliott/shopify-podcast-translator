import React from "react";
import "./App.css";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import Top from "./Top";
import Player from "./Player";
import Scrolltext from "./Scrolltext";

import { updateWindowDimensions, markEnglishAsPlaying } from "./actions";

function App() {
  //eslint-disable-next-line
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
  //test
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    initWindowSizes();

    dispatch(markEnglishAsPlaying(0.0, "TBD"));

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  // if (isMobile) {
  //   return <div> Mobile version coming soon (like, in a day) </div>;
  // } else {
  return (
    <FleXApp className="App">
      <GlobalStyles></GlobalStyles>

      <AppProvider i18n={enTranslations}>
        {/* <DividerTop>
          <ThickLine></ThickLine>
        </DividerTop> */}

        <TopDiv>
          <Top></Top>
        </TopDiv>
        {/* <Divider>
          <Line></Line>
        </Divider> */}

        <Player></Player>

        <ScrollDiv>
          <Scrolltext></Scrolltext>
        </ScrollDiv>
      </AppProvider>
    </FleXApp>
  );
  // }
}

// available diver styles if I need them.
// const Line = styled.div`
//   border-top: 1px solid #eec200;
//   @media (max-width: 600px) {
//     border-top: 1px solid white;
//   }
// `;

// const ThickLine = styled.div`
//   border-top: 3px solid #eec200;
//   @media (max-width: 600px) {
//     border-top: 1px solid white;
//   }
// `;

// const Divider = styled.div``;
// const DividerTop = styled.div``;

const FleXApp = styled.div``;
const TopDiv = styled.div`
  background-color: transparent;
`;
const ScrollDiv = styled.div`
  background-color: transparent;
`;

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
