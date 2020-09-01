import React, { useCallback, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import Player from "./Player.js";
import Transcript from "./Transcript.js";
import TranscriptSentence from "./TranscriptSentence.js";

import { PlayerContext } from "./PlayerContext";

import styled from "styled-components";
import Say from "react-say";
import { useSynthesize } from "react-say";
import { SayUtterance } from "react-say";

function App() {
  let speechtext = "hello";
  const playerContext = React.useContext(PlayerContext);
  const [localSentences, setLocalSetences] = React.useState([]);
  const [combinedSentences, setCombinedSentences] = React.useState([]);

  const [timeToJumpTo, setTimeToJumpTo] = React.useState(0.0);
  const [timeToEndOn, setTimeToEndOn] = React.useState(99999999.0);

  const [speakTranslation, setSpeakTranslation] = React.useState(false);

  const utterance = useMemo(
    () =>
      new SpeechSynthesisUtterance(
        "A quick brown fox jumped over the lazy dogs."
      ),
    []
  );

  const [
    transcriptIndexToHighlight,
    setTranscriptIndexToHighlight,
  ] = React.useState();

  const selector = useCallback((voices) =>
    [...voices].find((v) => v.lang === "fr-CA")
  );
  function handleClickedSentence(event) {
    console.log(event.currentTarget);
    console.log(event.currentTarget.id);

    let word = combinedSentences[event.currentTarget.id].word.word;

    let last_word = combinedSentences[event.currentTarget.id].last_word.word;

    let sentence_to_speak = console.log(word);

    setTranscriptIndexToHighlight(parseInt(event.currentTarget.id));
    setTimeToJumpTo(word.start);

    console.log(last_word);
    console.log(last_word.end);

    setTimeToEndOn(last_word.end);
    console.log(timeToEndOn);
  }
  function speakStuff(event) {
    setSpeakTranslation(true);

    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setSpeakTranslation(false);
    } else {
      playerContext.speakFrench(combinedSentences[0].translated_sentence);
    }
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

            console.log("fixed");
            console.log(sentenceAndGoodWordCombined[i].last_word);
          } else {
            console.log("not fixed");
          }
        }
      });

      setCombinedSentences(sentenceAndGoodWordCombined);

      console.log(sentenceAndGoodWordCombined[0]);

      // let data = await playerContext.getEnglishTextPromise();
      // let local_sentences = [];

      // // TODO: I could go in and hand correct the data, but I think it's more instructive to show how I deal with bad data

      // let sentenceAndGoodWord = [];
      // data.english_text.forEach((element, i) => {
      //   const iterator = element.aligned_words_matching[Symbol.iterator]();

      //   let ii = 0;
      //   let currentCase = "nil";
      //   let succesful_word = undefined;
      //   while (
      //     ii < element.aligned_words_matching.length - 1 &&
      //     succesful_word === undefined
      //   ) {
      //     let aligned_word = element.aligned_words_matching[ii];

      //     if (aligned_word.word.case === "success") {
      //       succesful_word = aligned_word;
      //     }
      //     ii = ii + 1;
      //   }

      //   if (succesful_word !== undefined) {
      //     sentenceAndGoodWord.push({
      //       sentence: element.still_to_be_done_element,
      //       word: succesful_word,
      //     });
      //   }
      // });
      // setLocalSetences(sentenceAndGoodWord);
      // console.log(sentenceAndGoodWord);

      setTranscriptIndexToHighlight(0);
    }
    getTranscriptSentences();
  }, []);

  return (
    <div className="App">
      <body>
        <Button onClick={speakStuff}>Hello</Button>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>

        <Player
          timeToJumpTo={timeToJumpTo}
          isSpeechPlaying={speakTranslation}
          timeToEndOn={timeToEndOn}
          pauseAtEndOfCurrentClip={true}
        />
        <TranscriptList>
          {combinedSentences.map((element, i) => {
            // console.log(element);
            return (
              <TranscriptItem>
                <Button
                  onClick={handleClickedSentence}
                  id={element.full_sentences_i}
                >
                  <TranscriptSentence
                    sentence_object={element}
                    key={element.full_sentences_i}
                    highlighted={
                      transcriptIndexToHighlight !== element.full_sentences_i
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
