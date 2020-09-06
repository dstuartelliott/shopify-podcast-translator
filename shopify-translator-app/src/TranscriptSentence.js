import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { PlayerBoundariesContext } from "./PlayerBoundariesContext";
import { HighlighterContext } from "./HighlighterContext";
import { SpeechSynthContext } from "./SpeechSynthContext";

import { LANGUAGES } from "./constants";

import {
  jumpToTime,
  markTranslationAsPlaying,
  markTranslationAsDonePlaying,
  markEnglishAsPlaying,
  markTranslationAsDonePlayingPaused,
} from "./actions";
import { useSelector } from "react-redux";

import {
  getTranslationPlaying,
  getSynthStateSpeaking,
  getTranslationTimeCodeAndUUID,
} from "./reducers";

import { useDispatch } from "react-redux";
var voices = speechSynthesis.getVoices();
let french_voice = voices.filter((v) => v.lang === "fr-CA");

let highlighted_french = false;
let highlighted_english = false;

function TranscriptSentence({
  sentence_object,
  englishHighlighted,
  translatedHightlighted,
  next_start_time,
  highlightedLang,
  uuidHighlighted,
}) {
  const dispatch = useDispatch();
  let translationPlaying = useSelector(getTranslationPlaying);
  let synthSpeaking = useSelector(getSynthStateSpeaking);
  let translationUUID = useSelector(getTranslationTimeCodeAndUUID).uuid;
  const {
    actions: { jumpToEnglishSentenceFromUUID, setUuidToHighLight, playSpeech },
  } = React.useContext(PlayerBoundariesContext);

  const {
    state: { uuidHighlightedIndivContext },
    actions: { updateUUID },
  } = React.useContext(HighlighterContext);

  const {
    actions: {
      playSpeechInSynthContext,
      cancelAllSpeech,
      playOrPauseSpeechSynth,
    },
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
    console.log(event);
    cancelAllSpeech();
    dispatch(markTranslationAsDonePlaying());

    dispatch(jumpToTime(sentence_object.start));

    dispatch(markEnglishAsPlaying(sentence_object.start, sentence_object.uuid));
  }

  function handleTranslatedClickedSentence(event) {
    console.log(event);
    playSpeechInSynthContext(sentence_object);
    dispatch(
      markTranslationAsPlaying(sentence_object.start, sentence_object.uuid)
    );
  }

  function handlePlayPauseTranslation(event) {
    playOrPauseSpeechSynth();
    event.stopPropagation();
  }

  function handlePlayPauseEnglish(event) {
    event.stopPropagation();
  }

  // this might look ugly, but it's better than nesteed terneries inmho

  if (englishHighlighted) {
    return (
      <Wrapper>
        <SentenceAndSpeakerSelected>
          <FlexButton onClick={handleClickedSentence}>
            <TranslationButton onClick={handlePlayPauseEnglish}>
              Play{" "}
            </TranslationButton>

            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </SentenceHighlighted>
          </FlexButton>
          <FlexButton onClick={handleTranslatedClickedSentence}>
            <Filler></Filler>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </Sentence>
          </FlexButton>
        </SentenceAndSpeakerSelected>
      </Wrapper>
    );
  } else if (translatedHightlighted) {
    return (
      <Wrapper>
        {console.log(synthSpeaking)}

        <SentenceAndSpeakerSelected>
          <FlexButton onClick={handleClickedSentence}>
            <Filler></Filler>

            <Sentence>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </Sentence>
          </FlexButton>
          <FlexButton onClick={handleTranslatedClickedSentence}>
            <TranslationButton onClick={handlePlayPauseTranslation}>
              {synthSpeaking && translationUUID === sentence_object.uuid
                ? "Pause"
                : "Play"}
            </TranslationButton>

            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </SentenceHighlighted>
          </FlexButton>
        </SentenceAndSpeakerSelected>
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
}

const Filler = styled.div`
  width: 150px;
  background-color: white;
  padding: 7px;
`;

const TranslationButton = styled.button`
  border: 1px;
  width: 150px;
  cursor: pointer;
  overflow: hidden;
  z-index: 2;
`;

const FlexButton = styled.button`
  display: flex;

  background-color: Transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
`;

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

const SentenceAndSpeakerSelected = styled.div``;

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
