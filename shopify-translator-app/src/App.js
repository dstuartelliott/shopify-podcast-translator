import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Player from "./Player.js";
import Transcript from "./Transcript.js";
import { PlayerContext } from "./PlayerContext";

import styled from "styled-components";

function App() {
  const playerContext = React.useContext(PlayerContext);

  React.useEffect(() => {
    async function getMeowsFromUser() {
      let data = await playerContext.getMyProfilePromise();
    }
    getMeowsFromUser();
  }, []);

  return (
    <div className="App">
      <body>
        <Player />
        <Transcript></Transcript>
        <div></div>
      </body>
    </div>
  );
}

export default App;
