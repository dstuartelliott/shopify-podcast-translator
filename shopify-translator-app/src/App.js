import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Player from "./Player.js";
import Transcript from "./Transcript.js";
import TranscriptSentence from "./TranscriptSentence.js";

import { PlayerContext } from "./PlayerContext";

import styled from "styled-components";

function App() {
  const playerContext = React.useContext(PlayerContext);
  const [localSentences, setLocalSetences] = React.useState([]);

  React.useEffect(() => {
    async function getTranscriptSentences() {
      let data = await playerContext.getMyProfilePromise();
      let local_sentences = [];
      data.translations.forEach((element) => {
        local_sentences.push(element.still_to_be_done_element.sentence);
      });
      setLocalSetences(data.translations);
      console.log(data.translations);
    }
    getTranscriptSentences();
  }, []);

  return (
    <div className="App">
      <body>
        <Player />

        <div>
          {localSentences.map((element) => {
            return (
              <TranscriptSentence
                sentence={element.still_to_be_done_element.sentence}
                key={
                  element.still_to_be_done_element
                    .full_sentences_just_text_filtered_i
                }
              ></TranscriptSentence>
            );
          })}
        </div>
      </body>
    </div>
  );
}

export default App;
