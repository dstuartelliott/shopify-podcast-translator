import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { PlayerBoundariesContext } from "./PlayerBoundariesContext";
import { HighlighterContext } from "./HighlighterContext";
import { SpeechSynthContext } from "./SpeechSynthContext";

import { LANGUAGES } from "./constants";

import { jumpToTime } from "./actions";
import { useDispatch } from "react-redux";
var voices = speechSynthesis.getVoices();
let french_voice = voices.filter((v) => v.lang === "fr-CA");

let highlighted_french = false;
let highlighted_english = false;

function TranscriptSentence({
  sentence_object,
  highlighted,
  next_start_time,
  highlightedLang,
  uuidHighlighted,
}) {
  const dispatch = useDispatch();

  const {
    actions: { jumpToEnglishSentenceFromUUID, setUuidToHighLight, playSpeech },
  } = React.useContext(PlayerBoundariesContext);

  const {
    state: { uuidHighlightedIndivContext },
    actions: { updateUUID },
  } = React.useContext(HighlighterContext);

  const {
    actions: { playSpeechInSynthContext },
  } = React.useContext(SpeechSynthContext);

  React.useEffect(() => {
    highlighted_french = false;
    highlighted_english = false;

    console.log(highlightedLang);
    if (highlightedLang === "french") {
      console.log("HIGHLIGHTING FRENCH");
      highlighted_french = true;
    }
    if (highlightedLang === "english") {
      console.log("HIGHLIGHTING ENGLISH");

      highlighted_english = true;
    }
    // console.log({ uuidHighlightedIndivContext });
  }, []);

  function handleClickedSentence(event) {
    //updateUUID(sentence_object.uuid);
    console.log(event);
    dispatch(jumpToTime(sentence_object.start));

    // setUuidToHighLight(sentence_object.uuid, LANGUAGES.ENGLISH);

    // jumpToEnglishSentenceFromUUID(sentence_object.uuid, sentence_object);
  }

  function handleClickedSentence(event) {
    console.log(event);
    dispatch(jumpToTime(sentence_object.start));
  }

  function handleTranslatedClickedSentence(event) {
    console.log(event);
    // setUuidToHighLight(sentence_object.uuid, LANGUAGES.FRENCH);
    playSpeechInSynthContext(sentence_object);

    // playSpeechInSynthContext(sentence_object);

    // dispatch(jumpToTime(sentence_object.start));

    // speechSynthesis.cancel();

    // let utterance = new SpeechSynthesisUtterance(
    //   sentence_object.translated_sentence
    // );
    // utterance.voice = french_voice[0];

    // utterance.onend = function (event) {
    //   console.log(
    //     "Utterance has finished being spoken after " +
    //       event.elapsedTime +
    //       " milliseconds."
    //   );

    //   if (sentence_object.next_start_time > 0) {
    //     dispatch(jumpToTime(sentence_object.next_start_time));
    //   }

    //   console.log(sentence_object.next_start_time);
    // };

    // speechSynthesis.speak(utterance);
    // dispatch(jumpToTime(-99.99));
  }

  // this might look ugly, but it's better than nesteed terneries inmho

  if (highlighted && speechSynthesis.speaking === false) {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence} 🇬🇧
            </SentenceHighlighted>
          </Button>
          <Button onClick={handleTranslatedClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
              <Button>Play</Button>
            </SentenceHighlighted>
          </Button>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  } else if (highlighted && speechSynthesis.speaking) {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </SentenceHighlighted>
          </Button>
          <Button onClick={handleTranslatedClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
              🇫🇷
            </SentenceHighlighted>
          </Button>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </Sentence>
          </Button>
          <Button onClick={handleTranslatedClickedSentence}>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </Sentence>
          </Button>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  }

  // if (highlighted && highlightedLang === "french") {
  //   return (
  //     <Wrapper>
  //       <Sentence>{uuidHighlightedIndivContext}</Sentence>

  //       <SentenceAndSpeaker>
  //         <Button onClick={handleClickedSentence}>
  //           <SentenceHighlighted>
  //             {sentence_object.speaker}: {sentence_object.english_sentence}
  //           </SentenceHighlighted>
  //         </Button>
  //         <Button onClick={handleTranslatedClickedSentence}>
  //           <SentenceHighlighted>
  //             {sentence_object.speaker}: {sentence_object.translated_sentence}
  //             🇫🇷
  //             <Button>Play</Button>
  //           </SentenceHighlighted>
  //         </Button>
  //       </SentenceAndSpeaker>
  //     </Wrapper>
  //   );
  // } else if (highlighted && highlightedLang === "english") {
  //   return (
  //     <Wrapper>
  //       <Sentence>{uuidHighlightedIndivContext}</Sentence>

  //       <SentenceAndSpeaker>
  //         <Button onClick={handleClickedSentence}>
  //           <SentenceHighlighted>
  //             {sentence_object.speaker}: {sentence_object.english_sentence} 🇨🇦
  //           </SentenceHighlighted>
  //         </Button>
  //         <Button onClick={handleTranslatedClickedSentence}>
  //           <SentenceHighlighted>
  //             {sentence_object.speaker}: {sentence_object.translated_sentence}
  //           </SentenceHighlighted>
  //         </Button>
  //       </SentenceAndSpeaker>
  //     </Wrapper>
  //   );
  // } else if (!highlighted) {
  //   return (
  //     <Wrapper>
  //       <Sentence>hello{uuidHighlightedIndivContext}</Sentence>

  //       <SentenceAndSpeaker>
  //         <Button onClick={handleClickedSentence}>
  //           <Sentence>
  //             {sentence_object.speaker}: {sentence_object.english_sentence}
  //           </Sentence>
  //         </Button>

  //         <Button onClick={handleTranslatedClickedSentence}>
  //           <Sentence>
  //             {sentence_object.speaker}: {sentence_object.translated_sentence}
  //           </Sentence>
  //         </Button>
  //       </SentenceAndSpeaker>
  //     </Wrapper>
  //   );
  // }
}

const Button = styled.button`
  background-color: Transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
`;

const Wrapper = styled.div`
  z-index: 2;
  text-align: left;
`;

const SentenceAndSpeaker = styled.div``;

const Speaker = styled.div`
  background-color: white;
  text-align: left;
  padding: 10px;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  /* border-bottom: solid 2px white; */
  color: grey;
`;

const Sentence = styled.div`
  background-color: white;
  text-align: left;
  padding: 10px;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  /* border-bottom: solid 2px white; */
  color: grey;
`;

const SentenceHighlighted = styled.div`
  background-color: white;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  /* border-bottom: solid 2px black; */

  text-align: left;
  padding: 10px;
  color: black;
`;

export default TranscriptSentence;
