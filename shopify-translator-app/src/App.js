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

  function handleClickedSentence(event) {
    let word = localSentences[event.currentTarget.id].word.word;
    console.log(word);
  }

  React.useEffect(() => {
    async function getTranscriptSentences() {
      let data = await playerContext.getMyProfilePromise();
      let local_sentences = [];

      // TODO: I could go in and hand correct the data, but I think it's more instructive to show how I deal with bad data

      let sentenceAndGoodWord = [];
      data.translations.forEach((element, i) => {
        const iterator = element.aligned_words_matching[Symbol.iterator]();

        let ii = 0;
        let currentCase = "nil";
        let succesful_word = undefined;
        while (
          ii < element.aligned_words_matching.length - 1 &&
          succesful_word === undefined
        ) {
          let aligned_word = element.aligned_words_matching[ii];

          if (aligned_word.word.case === "success") {
            succesful_word = aligned_word;
          }
          ii = ii + 1;
        }

        if (succesful_word !== undefined) {
          sentenceAndGoodWord.push({
            sentence: element.still_to_be_done_element,
            word: succesful_word,
          });
        }

        // let caseFromMatchedWord = "not-found-in-audio";
        // let index = 0;
        // while ((caseFromMatchedWord === "not-found-in-audio", i)) {}
        // local_sentences.push(element.still_to_be_done_element.sentence);
      });
      setLocalSetences(sentenceAndGoodWord);
      console.log(sentenceAndGoodWord);
    }
    getTranscriptSentences();
  }, []);

  return (
    <div className="App">
      <body>
        <Player />

        <div>
          {localSentences.map((element, i) => {
            return (
              <Button
                onClick={handleClickedSentence}
                id={element.sentence.full_sentences_just_text_filtered_i}
              >
                <TranscriptSentence
                  sentence_object={element}
                  key={element.sentence.full_sentences_just_text_filtered_i}
                ></TranscriptSentence>
              </Button>
            );
          })}
        </div>
      </body>
    </div>
  );
}
const Button = styled.button``;

export default App;
