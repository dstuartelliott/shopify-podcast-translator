import React from "react";
import "./App.css";
import styled from "styled-components";
import { SpeechSynthContext } from "./SpeechSynthContext";
import { IoIosPlay, IoIosPause } from "react-icons/io";

import {
  jumpToTime,
  markTranslationAsPlaying,
  markTranslationAsDonePlaying,
  markEnglishAsPlaying,
} from "./actions";
import { useSelector } from "react-redux";

import {
  getSynthStateSpeaking,
  getTranslationTimeCodeAndUUID,
  getMP3PlayerState,
  getCurrentTime,
} from "./reducers";

import { useDispatch } from "react-redux";

function TranscriptSentence({
  sentence_object,
  englishHighlighted,
  translatedHightlighted,
  next_start_time,
  highlightedLang,
  uuidHighlighted,
}) {
  const dispatch = useDispatch();

  let synthSpeaking = useSelector(getSynthStateSpeaking);
  let translationUUID = useSelector(getTranslationTimeCodeAndUUID).uuid;

  let curentTime = useSelector(getCurrentTime);

  let mp3PlayState = useSelector(getMP3PlayerState);

  const {
    actions: {
      playSpeechInSynthContext,
      cancelAllSpeech,
      playOrPauseSpeechSynth,
    },
  } = React.useContext(SpeechSynthContext);

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
    if (mp3PlayState === "playing") {
      console.log(" handlePlayPauseEnglish pausing");
      dispatch(jumpToTime(-99.99));
    } else if (mp3PlayState === "paused") {
      dispatch(jumpToTime(curentTime));
    }

    event.stopPropagation();
  }

  let buttonSize = 15;
  // this might look ugly, but it's better than a bunch of nesteed ternary statements imho
  // also, I originally had a Button instead of the  SentenceDiv, but then I got a react warning about nesteed buttons so I've opted
  if (englishHighlighted) {
    return (
      <Wrapper>
        <SentenceAndSpeakerSelected>
          <SentencePlayingDiv
            onClick={handleClickedSentence}
            id={sentence_object.uuid}
          >
            <ButtonDiv
              style={{ justiftyContent: "center", alignItems: "center" }}
            >
              <TranslationButton onClick={handlePlayPauseEnglish}>
                {mp3PlayState === "playing" ? (
                  <IoIosPause size={buttonSize} />
                ) : (
                  <IoIosPlay size={buttonSize} />
                )}
              </TranslationButton>
            </ButtonDiv>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </SentenceHighlighted>
          </SentencePlayingDiv>
          <SentencePlayingDiv onClick={handleTranslatedClickedSentence}>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </Sentence>
          </SentencePlayingDiv>
        </SentenceAndSpeakerSelected>
      </Wrapper>
    );
  } else if (translatedHightlighted) {
    return (
      <Wrapper>
        <SentenceAndSpeakerSelected>
          <SentencePlayingDiv
            onClick={handleClickedSentence}
            id={sentence_object.uuid}
          >
            <Sentence>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </Sentence>
          </SentencePlayingDiv>

          <SentencePlayingDiv onClick={handleTranslatedClickedSentence}>
            <ButtonDiv>
              <TranslationButton onClick={handlePlayPauseTranslation}>
                {synthSpeaking && translationUUID === sentence_object.uuid ? (
                  <IoIosPause size={buttonSize} />
                ) : (
                  <IoIosPlay size={buttonSize} />
                )}
              </TranslationButton>
            </ButtonDiv>

            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </SentenceHighlighted>
          </SentencePlayingDiv>
        </SentenceAndSpeakerSelected>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <SentenceDiv
            onClick={handleClickedSentence}
            id={sentence_object.uuid}
          >
            <Sentence>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </Sentence>
          </SentenceDiv>
          <SentenceDiv onClick={handleTranslatedClickedSentence}>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </Sentence>
          </SentenceDiv>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  }
}

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  min-width: 139px;
  text-align: center;
`;

const TranslationButton = styled.button`
  cursor: pointer;

  overflow: hidden;
  z-index: 200;
  border-radius: 25px;
  border-color: transparent;
  color: rgba(92, 115, 196);
  background-color: transparent;
  :focus {
    outline: none;
  }
  align-self: center;
`;

const SentenceDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 20px;
  max-width: 900px;
`;

const SentencePlayingDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 20px;
  max-width: 900px;
`;

const Wrapper = styled.div`
  z-index: 2;
  text-align: left;
`;

const SentenceAndSpeaker = styled.div``;

const SentenceAndSpeakerSelected = styled.div``;

const Sentence = styled.div`
  background-color: white;
  padding-left: 150px;
  color: grey;
`;

const SentenceHighlighted = styled.div`
  background-color: white;
  padding-left: 11px;

  color: rgba(26, 26, 26);
`;

export default TranscriptSentence;
