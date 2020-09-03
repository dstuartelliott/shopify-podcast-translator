import React, { useCallback, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import Player from "./Player.js";
import TranscriptSentence from "./TranscriptSentence.js";

import { PlayerContext } from "./PlayerContext";
import { PlayerBoundariesContext } from "./PlayerBoundariesContext";
import { HighlighterContext } from "./HighlighterContext";

import styled from "styled-components";

import { LANGUAGES } from "./constants";

function App() {
  let speechtext = "hello";
  const playerContext = React.useContext(PlayerContext);
  // const [combinedSentences, setCombinedSentences] = React.useState([]);

  const [timeToJumpTo, setTimeToJumpTo] = React.useState(0.0);
  const [timeToEndOn, setTimeToEndOn] = React.useState(99999999.0);
  const highligherContext = React.useContext(HighlighterContext);

  const {
    state: {
      shouldMP3StillPlay,
      currentTimePlayHead,
      contextSentenceAndGoodWordCombined,
      speakTranslation,
      uuidToHighLight,
    },
    actions: {
      sendUpdatedPlayHeadPosition,
      playSpeechAndThenRestartPlayer,
      pausePlayer,
      startPlayer,
      jumpToEnglishSentenceAndPlay,
      getContextSentenceAndGoodWordCombined,
      updateContextSentenceAndGoodWordCombined,
      setSpeakTranslation,
      setUuidToHighLight,
    },
  } = React.useContext(PlayerBoundariesContext);

  const [
    transcriptIndexToHighlight,
    setTranscriptIndexToHighlight,
  ] = React.useState();

  function speakStuff(event) {
    console.log(shouldMP3StillPlay);
    pausePlayer();
    // setSpeakTranslation(!speakTranslation);
  }

  React.useEffect(() => {
    console.log(uuidToHighLight);
  });

  React.useEffect(() => {
    async function getTranscriptSentences() {
      let combined = await playerContext.getCombined();
      console.log(combined.translations);

      let sentenceAndGoodWordCombined = [];
      combined.translations.forEach((element, i) => {
        // // TODO: I could go in and hand correct the data, but I think it's more instructive to show how I deal with bad data

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

        let last_word;
        if (element.words[element.words.length - 1].word.case === "success") {
          last_word = element.words[element.words.length - 1];
        } else {
          // is the next word available?
          last_word = undefined;
        }

        if (succesful_word !== undefined) {
          sentenceAndGoodWordCombined.push({
            english_sentence: element.english,
            translated_sentence: element.translation,
            speaker: element.speaker,
            word: succesful_word,
            last_word: last_word,
            words: element.words,
            full_sentences_i: element.full_sentences_i,
            uuid: element.uuid,
            isHighlighted: false,
            highlightedLang: "none",
          });
        }
      });

      sentenceAndGoodWordCombined.forEach((element, i) => {
        if (element.last_word === undefined) {
          console.log(sentenceAndGoodWordCombined[i].last_word);

          if (
            sentenceAndGoodWordCombined[i + 1] !== undefined &&
            sentenceAndGoodWordCombined[i + 1].word !== undefined
          ) {
            sentenceAndGoodWordCombined[i].last_word =
              sentenceAndGoodWordCombined[i + 1].word;

            // console.log("fixed");
            // console.log(sentenceAndGoodWordCombined[i].last_word);
          } else {
            // console.log("not fixed");
          }
        }
      });

      updateContextSentenceAndGoodWordCombined(sentenceAndGoodWordCombined);
    }
    getTranscriptSentences();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log(highligherContext.current__play_head_time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Button onClick={speakStuff}>
        {speakTranslation ? (
          <div>Translation On</div>
        ) : (
          <div>Translation Off</div>
        )}
      </Button>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>

      <Player />
      <TranscriptList>
        {contextSentenceAndGoodWordCombined.map((element, i) => {
          // console.log(element.uuid);
          // console.log(uuidToHighLight);

          return (
            <TranscriptItem>
              <TranscriptSentence
                sentence_object={element}
                key={element.uuid}
                highlighted={element.isHighlighted}
                highlightedLang={element.highlightedLang}
              ></TranscriptSentence>
            </TranscriptItem>
          );
        })}
      </TranscriptList>
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
