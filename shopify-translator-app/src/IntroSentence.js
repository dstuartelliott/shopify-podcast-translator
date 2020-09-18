import React from "react";
import "./App.css";
import styled from "styled-components";
import { SpeechSynthContext } from "./SpeechSynthContext";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { MP3_PLAYER_STATES } from "./constants";
import {
  jumpToTime,
  markTranslationAsDonePlaying,
  markEnglishAsPlaying,
  recordMP3PlayerState,
  updateSpeechSynthState,
} from "./actions";
import { useSelector } from "react-redux";

import { COLORS_SHOPIFY_BLUE_PALLETE } from "./constants.js";

import { getMP3PlayerState } from "./reducers";

import { useDispatch } from "react-redux";

function IntroSentence({
  sentence_object,
  englishHighlighted,
  translatedHightlighted,
}) {
  const dispatch = useDispatch();

  let mp3PlayState = useSelector(getMP3PlayerState);

  const {
    actions: { cancelAllSpeech },
  } = React.useContext(SpeechSynthContext);

  function handleClickedSentence(event) {
    console.log(event);
    console.log(sentence_object.start);
    cancelAllSpeech();
    dispatch(markTranslationAsDonePlaying());
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    dispatch(updateSpeechSynthState(false));

    dispatch(jumpToTime(sentence_object.start));

    dispatch(
      markEnglishAsPlaying({
        english_time_code_from_db: sentence_object.start,
        english_uuid: sentence_object.uuid,
        type_curently_playing: "English",
      })
    );

    //dispatch(markEnglishAsPlaying(sentence_object.start, sentence_object.uuid));
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
              {sentence_object.english_sentence}
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
            <Sentence>{sentence_object.english_sentence}</Sentence>
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

export default IntroSentence;