import React from "react";
import "./App.css";
import styled from "styled-components";
import { SpeechSynthContext } from "./SpeechSynthContext";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { MP3_PLAYER_STATES } from "./constants";
import {
  jumpToTime,
  markTranslationAsPlaying,
  markTranslationAsDonePlaying,
  markEnglishAsPlaying,
  recordMP3PlayerState,
  updateSpeechSynthState,
} from "./actions";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import {
  getSynthStateSpeaking,
  getTranslationTimeCodeAndUUID,
  getMP3PlayerState,
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
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    dispatch(updateSpeechSynthState(false));

    dispatch(jumpToTime(sentence_object.start));
    console.log("------------ markEnglish");

    console.log("TranscriptSentence 57");

    dispatch(
      markEnglishAsPlaying({
        english_time_code_from_db: sentence_object.start,
        english_uuid: sentence_object.uuid,
        type_curently_playing: "English",
      })
    );

    //dispatch(markEnglishAsPlaying(sentence_object.start, sentence_object.uuid));
  }

  function handleTranslatedClickedSentence(event) {
    console.log(
      "=========================================================================="
    );

    console.log(event);
    playSpeechInSynthContext(sentence_object);
    dispatch(
      markTranslationAsPlaying(sentence_object.start, sentence_object.uuid)
    );
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
  }

  function handlePlayPauseTranslation(event) {
    playOrPauseSpeechSynth();
    event.stopPropagation();
  }

  function handlePlayPauseEnglish(event) {
    console.log(" handlePlayPauseEnglish pausing");
    console.log(" ***********************************");

    if (mp3PlayState === MP3_PLAYER_STATES.PAUSED) {
      // dispatch(jumpToTime(-99.99));
      dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    } else if (mp3PlayState === MP3_PLAYER_STATES.PLAYING) {
      // dispatch(jumpToTime(curentTime));
      dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
    }

    event.stopPropagation();
  }

  let buttonSize = 15;
  // this might look ugly, but it's better than a bunch of nesteed ternary statements imho
  // also, I originally had a Button instead of the  SentenceDiv, but then I got a react warning about nesteed buttons so I've opted

  if (isMobile) {
    if (englishHighlighted) {
      return (
        <Wrapper>
          <SentenceAndSpeakerSelected>
            <SentencePlayingDivMB
              onClick={handleClickedSentence}
              id={sentence_object.uuid}
            >
              <ButtonDivMB
                style={{ justiftyContent: "center", alignItems: "center" }}
              >
                <TranslationButtonDB onClick={handlePlayPauseEnglish}>
                  {mp3PlayState === "playing" ? (
                    <IoIosPause size={buttonSize} />
                  ) : (
                    <IoIosPlay size={buttonSize} />
                  )}
                </TranslationButtonDB>
              </ButtonDivMB>
              <SentenceHighlightedMB>
                {sentence_object.speaker}: {sentence_object.english_sentence}
              </SentenceHighlightedMB>
            </SentencePlayingDivMB>
            <SentencePlayingDivMB onClick={handleTranslatedClickedSentence}>
              <SentenceMB className="”notranslate”">
                {sentence_object.speaker}: {sentence_object.translated_sentence}
              </SentenceMB>
            </SentencePlayingDivMB>
          </SentenceAndSpeakerSelected>
        </Wrapper>
      );
    } else if (translatedHightlighted) {
      return (
        <Wrapper>
          <SentenceAndSpeakerSelected>
            <SentencePlayingDivMB
              onClick={handleClickedSentence}
              id={sentence_object.uuid}
            >
              <SentenceMB>
                {sentence_object.speaker}: {sentence_object.english_sentence}
              </SentenceMB>
            </SentencePlayingDivMB>

            <SentencePlayingDivMB onClick={handleTranslatedClickedSentence}>
              <ButtonDivMB>
                <TranslationButtonDB onClick={handlePlayPauseTranslation}>
                  {synthSpeaking && translationUUID === sentence_object.uuid ? (
                    <IoIosPause size={buttonSize} />
                  ) : (
                    <IoIosPlay size={buttonSize} />
                  )}
                </TranslationButtonDB>
              </ButtonDivMB>

              <SentenceHighlighted className="”notranslate”">
                {sentence_object.speaker}: {sentence_object.translated_sentence}
              </SentenceHighlighted>
            </SentencePlayingDivMB>
          </SentenceAndSpeakerSelected>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <SentenceAndSpeaker>
            <SentenceDivMB
              onClick={handleClickedSentence}
              id={sentence_object.uuid}
            >
              <SentenceMB>
                {sentence_object.speaker}: {sentence_object.english_sentence}
              </SentenceMB>
            </SentenceDivMB>
            <SentenceDivMB onClick={handleTranslatedClickedSentence}>
              <SentenceMB className="”notranslate”">
                {sentence_object.speaker}: {sentence_object.translated_sentence}
              </SentenceMB>
            </SentenceDivMB>
          </SentenceAndSpeaker>
        </Wrapper>
      );
    }
  }
  if (isMobile === false) {
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
              <Sentence className="”notranslate”">
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

              <SentenceHighlighted className="”notranslate”">
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
              <Sentence className="”notranslate”">
                {sentence_object.speaker}: {sentence_object.translated_sentence}
              </Sentence>
            </SentenceDiv>
          </SentenceAndSpeaker>
        </Wrapper>
      );
    }
  }
}

// Mobile

const SentencePlayingDivMB = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 10px;
`;

const SentenceDivMB = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 10px;
`;

const SentenceMB = styled.div`
  background-color: white;
  padding-left: 11px;
  color: grey;
  margin-right: 0px;
`;
const SentenceHighlightedMB = styled.div`
  background-color: white;
  padding-left: 11px;

  color: rgba(26, 26, 26);
`;

const ButtonDivMB = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
`;

const TranslationButtonDB = styled.button`
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

// Desktop

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
