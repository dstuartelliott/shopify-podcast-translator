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
  updateWhatClickedOn,
  updateVoicesSynth,
} from "./actions";
import { useSelector } from "react-redux";

import { COLORS_SHOPIFY_BLUE_PALLETE } from "./constants.js";

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
    dispatch(updateWhatClickedOn("english"));
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
    let utterance = new SpeechSynthesisUtterance("test dave");

    // let voices = speechSynthesis.getVoices();
    // let french_voice = voices.filter((v) => v.lang === "fr-CA");

    // let lang1 = french_voice[0].lang;
    // let uri1 = sentence_object.translated_sentence;

    let lang1 = "one";
    let uri1 = "two";

    dispatch(updateVoicesSynth({ lang1, uri1 }));

    speechSynthesis.speak(utterance);

    // utterance.voice = french_voice[0];
    // utterance.onboundary = function (event) {
    //   let remaining_words = event.target.text.slice(
    //     event.charIndex,
    //     event.target.text.length - 1
    //   );

    //   true_remaining_words = event.target.text.slice(
    //     event.charIndex + event.charLength,
    //     event.target.text.length - 1
    //   );

    //   last_boundary = event;
    //   let spaces_left_in_remaining_words = remaining_words.split(" ");
    //   dispatch(updateSpeechSynthState(speechSynthesis.speaking));

    //   if (spaces_left_in_remaining_words.length === 1) {
    //     const timer = setTimeout(() => {
    //       dispatch(markTranslationAsDonePlaying());

    //       // jump to the next one, but this is confusing from a user perspective.
    //       // dispatch(jumpToTime(sentence_object.next_start_time));
    //     }, 1000);
    //     console.log(timer);
    //   }
    // };

    //    dispatch(updateSpeechSynthState(speechSynthesis.speaking));

    // dispatch(jumpToTime(-99.99));

    // console.log(
    //   "=========================================================================="
    // );
    // //dispatch(updateWhatClickedOn("translation"));

    // console.log(event);
    // dispatch(
    //   markTranslationAsPlaying({
    //     translation_time_code: sentence_object.start,
    //     translated_uuid: sentence_object.uuid,
    //     type_curently_playing: "Translation",
    //   })
    // );
    // dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
    // playSpeechInSynthContext(sentence_object);
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
          <SentenceDiv onClick={handleTranslatedClickedSentence}>
            <Sentence className="”notranslate”">
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </Sentence>
          </SentenceDiv>
        </SentenceAndSpeakerSelected>
      </Wrapper>
    );
  } else if (translatedHightlighted) {
    return (
      <Wrapper>
        <SentenceAndSpeakerSelected>
          <SentenceDiv
            onClick={handleClickedSentence}
            id={sentence_object.uuid}
          >
            <Sentence>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </Sentence>
          </SentenceDiv>

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

// Desktop
const Wrapper = styled.div`
  z-index: 2;
  text-align: left;
`;

const SentenceAndSpeaker = styled.div``;

const SentenceAndSpeakerSelected = styled.div``;

const SentencePlayingDiv = styled.div`
  display: flex;

  flex-direction: row;

  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 10px;
  @media (max-width: 600px) {
    padding-bottom: 10px;
    /* TODO it's row-reverse because of right-handed mobile operation.  Todo - put in left handed option. */
    flex-direction: row-reverse;
    /* background-color: red; */
    justify-content: flex-end;
  }
`;

const SentenceDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    padding-bottom: 10px;
    /* background-color: blue; */

    /* TODO it's row-reverse because of right-handed mobile operation.  Todo - put in left handed option. */
  }
`;

const SentenceHighlighted = styled.div`
  background-color: white;
  padding-left: 11px;

  color: rgba(26, 26, 26);

  @media (max-width: 600px) {
    background-color: white;
    padding-left: 11px;

    color: rgba(26, 26, 26);
  }
`;

const Sentence = styled.div`
  background-color: white;
  padding-left: 150px;
  color: grey;

  @media (max-width: 600px) {
    background-color: white;
    padding-left: 11px;
    color: ${COLORS_SHOPIFY_BLUE_PALLETE.Text};
    margin-right: 0px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  min-width: 139px;
  text-align: center;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    background-color: white;
    text-align: center;
    min-width: 40px;
    flex-grow: 2;
  }
`;

const TranslationButton = styled.button`
  cursor: pointer;

  overflow: hidden;
  z-index: 200;
  border-radius: 25px;
  border-color: transparent;
  /* color: rgba(92, 115, 196); */
  color: ${COLORS_SHOPIFY_BLUE_PALLETE.Blue};

  background-color: transparent;
  :focus {
    outline: none;
  }
  align-self: center;

  @media (max-width: 600px) {
    align-self: flex-end;

    /*  no apparent difference */
  }
`;

export default TranscriptSentence;
