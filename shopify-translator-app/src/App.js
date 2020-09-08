import React from "react";
import "./App.css";
import Player2 from "./Player2.js";
import Transcript from "./Transcript.js";
import styled from "styled-components";

function App() {
  React.useEffect(() => {
    console.log("app");
    // speechSynthesis.addEventListener("voiceschanged", function () {
    //   let voices_new = speechSynthesis.getVoices();
    //   console.log(voices_new);

    // });
  }, []);

  return (
    <AppDiv className="App">
      <Player2 />
      <Spacer></Spacer>
      <Transcript></Transcript>
    </AppDiv>
  );
}

const AppDiv = styled.div``;

const Spacer = styled.div`
  width: 100%;
  height: 100px;
`;

export default App;
