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
  const [combinedSentences, setCombinedSentences] = React.useState([]);

  const [timeToJumpTo, setTimeToJumpTo] = React.useState(0.0);

  const [
    transcriptIndexToHighlight,
    setTranscriptIndexToHighlight,
  ] = React.useState();

  function handleClickedSentence(event) {
    let word = localSentences[event.currentTarget.id].word.word;
    console.log(word);
    console.log(event.currentTarget.id);

    setTranscriptIndexToHighlight(parseInt(event.currentTarget.id));
    setTimeToJumpTo(word.start);
  }

  React.useEffect(() => {
    async function getTranscriptSentences() {
      let combined = await playerContext.getCombined();
      console.log(combined.translations);

      let sentenceAndGoodWordCombined = [];
      combined.translations.forEach((element, i) => {
        const iterator = element.words[Symbol.iterator]();

        let ii = 0;
        let currentCase = "nil";
        let succesful_word = undefined;
        while (ii < element.words.length - 1 && succesful_word === undefined) {
          let aligned_word = element.words[ii];

          if (aligned_word.word.case === "success") {
            succesful_word = aligned_word;
          }
          ii = ii + 1;
        }

        if (succesful_word !== undefined) {
          sentenceAndGoodWordCombined.push({
            english_sentence: element.english,
            translated_sentence: element.translation,
            speaker: element.speaker,
            word: succesful_word,
            words: element.words,
          });
        }
      });

      setCombinedSentences(sentenceAndGoodWordCombined);

      console.log(sentenceAndGoodWordCombined[0]);

      let data = await playerContext.getEnglishTextPromise();
      let local_sentences = [];

      // TODO: I could go in and hand correct the data, but I think it's more instructive to show how I deal with bad data

      let sentenceAndGoodWord = [];
      data.english_text.forEach((element, i) => {
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
      });
      setLocalSetences(sentenceAndGoodWord);
      setTranscriptIndexToHighlight(0);
      console.log(sentenceAndGoodWord);
    }
    getTranscriptSentences();
  }, []);

  return (
    <div className="App">
      <body>
        <Player timeToJumpTo={timeToJumpTo} />

        <TranscriptList>
          {localSentences.map((element, i) => {
            // console.log(
            //   setTranscriptIndexToHighlight ===
            //     element.sentence.full_sentences_just_text_filtered_i
            // );

            // console.log(setTranscriptIndexToHighlight);

            // console.log(element.sentence.full_sentences_just_text_filtered_i);

            return (
              <TranscriptItem>
                <Button
                  onClick={handleClickedSentence}
                  id={element.sentence.full_sentences_just_text_filtered_i}
                >
                  <TranscriptSentence
                    sentence_object={element}
                    key={element.sentence.full_sentences_just_text_filtered_i}
                    highlighted={
                      transcriptIndexToHighlight !==
                      element.sentence.full_sentences_just_text_filtered_i
                    }
                  ></TranscriptSentence>
                </Button>
              </TranscriptItem>
            );
          })}
        </TranscriptList>
      </body>
    </div>
  );
}
const Button = styled.button`
  background-color: Transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
`;
const TranscriptList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TranscriptItem = styled.div``;

export default App;
