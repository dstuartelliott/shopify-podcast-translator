import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { PlayerContext } from "./PlayerContext";
import { PlayerBoundariesContext } from "./PlayerBoundariesContext";
import TranscriptSentence from "./TranscriptSentence.js";

function Transcript() {
  const playerContext = React.useContext(PlayerContext);

  const {
    state: { contextSentenceAndGoodWordCombined, uuidHighlighted },
    actions: { updateContextSentenceAndGoodWordCombined },
  } = React.useContext(PlayerBoundariesContext);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(highligherContext.current__play_head_time);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

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

      updateContextSentenceAndGoodWordCombined(sentenceAndGoodWordCombined);
    }
    getTranscriptSentences();
  }, []);

  return (
    <TranscriptWrapper>
      <div>hello {uuidHighlighted}</div>

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
                uuidHighlighted={uuidHighlighted}
              ></TranscriptSentence>
            </TranscriptItem>
          );
        })}
      </TranscriptList>
    </TranscriptWrapper>
  );
}

const TranscriptWrapper = styled.div`
  background-color: white;
  top: 0px;
`;

const TranscriptList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TranscriptItem = styled.div``;

export default Transcript;
