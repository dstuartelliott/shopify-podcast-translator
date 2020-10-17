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
import "focus-visible";

import { PlayerContext } from "./PlayerContext";
import { DatabaseContext } from "./DatabaseContext";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "./actions";

import { markEnglishAsPlaying, changeTranslation } from "./actions";

const gapiLoaded = () =>
  new Promise((resolve) => {
    console.log("promise");
    const interval = setInterval(() => {
      if (window.gapi != null) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });

function App() {
  //eslint-disable-next-line
  const dispatch = useDispatch();

  const playerContext = React.useContext(PlayerContext);
  const databaseContext = React.useContext(DatabaseContext);

  //test
  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));

    async function getGoogle() {
      window.gapi.load("auth2", async function () {
        let auth_object = await window.gapi.auth2.init({
          client_id:
            "112704103478-qojm07it64b672dk2mto976ivf6592jm.apps.googleusercontent.com",
        });

        console.log(auth_object);

        let current_user = auth_object.currentUser.get();

        let id_token = current_user.getAuthResponse().id_token;

        // console.log(id_token);

        // let verified_token = await databaseContext.getVerifiedToken(id_token);

        // // let added_to_db = await databaseContext.initialAuthSend(verified_token);
        // console.log(verified_token);

        let verified_token1 = await databaseContext.getVerifiedTokenLocal(
          id_token
        );
        console.log(verified_token1);

        // getVerifiedTokenLocal

        let verified_in_db = await databaseContext.verifyTokenAndSlapItIntoDatabase(
          id_token
        );

        console.log(verified_in_db);

        /* Ready. Make a call to gapi.auth2.init or some other API */
      });
    }

    getGoogle();

    // window.gapi.load("auth2", () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id: "YOUR_CLIENT_ID",
    //   });
    // });

    // eslint-disable-next-line
  }, []);

  const [profileName, setProfileName] = React.useState("none");

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // var id_token = googleUser.getAuthResponse().id_token;

    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    // console.log("Email: " + id_token); // This is null if the 'email' scope is not present.

    setProfileName(profile.getName());
  }

  // if (isMobile) {
  //   return <div> Mobile version coming soon (like, in a day) </div>;
  // } else {
  return (
    <FocusVisible className="js-focus-visible focus-visible">
      <FleXApp className="App">
        <GlobalStyles></GlobalStyles>
        <AppProvider i18n={enTranslations}>
          <TopDiv>
            <SignInDiv>
              <div class="g-signin2" data-onsuccess="onSignIn"></div>
              {profileName}
            </SignInDiv>

            <Top></Top>
          </TopDiv>
          <Player></Player>

          <ScrollDiv>
            <Scrolltext></Scrolltext>
          </ScrollDiv>
        </AppProvider>
      </FleXApp>
    </FocusVisible>
  );
  // }
}

const SignInDiv = styled.div``;

const FleXApp = styled.div``;
const TopDiv = styled.div`
  background-color: transparent;
`;

const ScrollDiv = styled.div`
  background-color: transparent;
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
