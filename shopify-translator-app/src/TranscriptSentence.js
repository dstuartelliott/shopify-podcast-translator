import React from "react";
import "./App.css";
import styled from "styled-components/macro";
import { MP3_PLAYER_STATES, TRANSLATION_MP3_PLAYER_STATES } from "./constants";
import {
  jumpToTime,
  markTranslationAsPlaying,
  markTranslationAsDonePlaying,
  recordMP3PlayerState,
  recordTranslationMP3PlayerState,
  changeUUIDPlaying,
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "./actions";
import { useSelector } from "react-redux";
import {
  COLORS_SHOPIFY_BLUE_PALLETE,
  COLORS_FLAG,
  COLORS_SHOPIFY_YELLOW_PALLETE,
} from "./constants.js";

import {
  getTranslationMP3PlayerState,
  getShowTranslation,
  getClickMeStatus,
} from "./reducers";

import { useDispatch } from "react-redux";

function TranscriptSentence({
  sentence_object,
  englishHighlighted,
  translatedHightlighted,
  translatedUUID,
  i_from_list,
}) {
  const dispatch = useDispatch();

  let translationMp3PlayerState = useSelector(getTranslationMP3PlayerState);

  let showTranslation = useSelector(getShowTranslation);

  let clickMeStatus = useSelector(getClickMeStatus);

  // const [showTranslation, setshowTranslation] = React.useState(false);

  function handleClickedSentence(event) {
    englishHighlighted = true;
    translatedHightlighted = false;

    console.log(event);
    console.log(sentence_object);
    dispatch(markTranslationAsDonePlaying());
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));

    console.log("TranscriptSentence 49");
    console.log(sentence_object.uuid);

    dispatch(changeUUIDPlaying(sentence_object.uuid));
    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

    dispatch(jumpToTime(sentence_object.start));
  }

  function handleTranslatedClickedSentence(event) {
    englishHighlighted = false;
    translatedHightlighted = true;

    dispatch(updateClickMeHasBeenClicked(true));

    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(
      markTranslationAsPlaying({
        translation_time_code: sentence_object.start,
        translated_uuid: sentence_object.uuid,
        type_curently_playing: "Translation",
        translated_filename: sentence_object.translated_filename,
      })
    );
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));

    if (translationMp3PlayerState === TRANSLATION_MP3_PLAYER_STATES.PAUSED) {
      dispatch(
        recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PLAYING)
      );
    } else if (
      translationMp3PlayerState === TRANSLATION_MP3_PLAYER_STATES.PLAYING
    ) {
      dispatch(
        recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
      );
    }

    if (translatedUUID !== undefined) {
      console.log("TranscriptSentence 83");
      dispatch(changeUUIDPlaying(translatedUUID));
    }
  }

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
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </SentenceHighlighted>
          </SentencePlayingDiv>
          {showTranslation ? (
            <SentenceDiv
              onClick={handleTranslatedClickedSentence}
              id={translatedUUID}
            >
              <SentenceQuebec className="”notranslate”">
                <SpeakerFrench>{sentence_object.speaker}</SpeakerFrench>:{" "}
                {sentence_object.translated_sentence}
              </SentenceQuebec>
            </SentenceDiv>
          ) : (
            <div></div>
          )}
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
              <SpeakerEnglish>{sentence_object.speaker}</SpeakerEnglish>:{" "}
              {sentence_object.english_sentence}
            </Sentence>
          </SentenceDiv>
          {showTranslation ? (
            <SentencePlayingDiv
              onClick={handleTranslatedClickedSentence}
              id={translatedUUID}
            >
              <SentenceHighlightedQuebec className="”notranslate”">
                {sentence_object.speaker}: {sentence_object.translated_sentence}
              </SentenceHighlightedQuebec>
            </SentencePlayingDiv>
          ) : (
            <div></div>
          )}
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
              <SpeakerEnglish>{sentence_object.speaker}</SpeakerEnglish>:{" "}
              {sentence_object.english_sentence}
            </Sentence>
          </SentenceDiv>
          {i_from_list === 1 && showTranslation && !clickMeStatus ? (
            <ClickMeButton onClick={handleTranslatedClickedSentence}>
              Click Me!
            </ClickMeButton>
          ) : (
            ""
          )}
          {showTranslation ? (
            <SentenceDiv
              onClick={handleTranslatedClickedSentence}
              id={translatedUUID}
            >
              <SentenceQuebec className="”notranslate”">
                <SpeakerFrench>{sentence_object.speaker}</SpeakerFrench>:{" "}
                {sentence_object.translated_sentence}
              </SentenceQuebec>
            </SentenceDiv>
          ) : (
            <div></div>
          )}
        </SentenceAndSpeaker>
      </Wrapper>
    );
  }
}
const ClickMeButton = styled.button`
  color: ${COLORS_SHOPIFY_YELLOW_PALLETE.Darker};
  background-color: ${COLORS_SHOPIFY_BLUE_PALLETE.Light};
  transform: rotate(-15deg);
  position: absolute;
  border: 0px;
  border-radius: 5px;
  padding: 3px;
  left: 90%;
`;

const Wrapper = styled.div`
  z-index: 2;
  text-align: left;
`;

const SpeakerEnglish = styled.span`
  /* color: ${COLORS_SHOPIFY_YELLOW_PALLETE.Yellow}; */
  color: ${COLORS_FLAG.Canada};
`;

const SpeakerFrench = styled.span`
  /* color: ${COLORS_SHOPIFY_BLUE_PALLETE.Blue}; */
  color: ${COLORS_FLAG.Quebec};
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
  background-color: ${COLORS_SHOPIFY_YELLOW_PALLETE.Lighter};
  padding-left: 11px;

  color: rgba(26, 26, 26);

  @media (max-width: 600px) {
    background-color: ${COLORS_SHOPIFY_YELLOW_PALLETE.Lighter};
    padding-left: 11px;

    color: rgba(26, 26, 26);
  }
`;

const Sentence = styled.div`
  background-color: white;
  padding-left: 11px;
  color: rgba(26, 26, 26);

  @media (max-width: 600px) {
    background-color: white;
    padding-left: 11px;
    color: rgba(26, 26, 26);
    margin-right: 0px;
  }
`;

const SentenceQuebec = styled.div`
  background-color: white;
  padding-left: 11px;
  color: rgba(26, 26, 26);
  @media (max-width: 600px) {
    background-color: white;
    padding-left: 11px;
    color: rgba(26, 26, 26);
    margin-right: 0px;
  }
`;

const SentenceHighlightedQuebec = styled.div`
  padding-left: 11px;
  background-color: ${COLORS_SHOPIFY_BLUE_PALLETE.Lighter};

  color: rgba(26, 26, 26);

  @media (max-width: 600px) {
    background-color: ${COLORS_SHOPIFY_BLUE_PALLETE.Lighter};
    padding-left: 11px;

    color: rgba(26, 26, 26);
  }
`;

export default TranscriptSentence;
