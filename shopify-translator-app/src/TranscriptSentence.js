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
import { useSelector, useDispatch } from "react-redux";
import {
  COLORS_SHOPIFY_BLUE_PALLETE,
  COLORS_SHOPIFY_YELLOW_PALLETE,
} from "./constants.js";

import {
  getTranslationMP3PlayerState,
  getShowTranslation,
  getClickMeStatus,
} from "./reducers";

// import StarComponent from "./SVGs/StarComponent";
// import SideActionButtons from "./SideActionButtons";

function TranscriptSentence({
  sentence_object,
  englishHighlighted,
  translatedHightlighted,
  translatedUUID,
  i_from_list,
}) {
  const dispatch = useDispatch();

  const englishSentenceWidth = "418px";

  let translationMp3PlayerState = useSelector(getTranslationMP3PlayerState);

  let showTranslation = useSelector(getShowTranslation);

  let clickMeStatus = useSelector(getClickMeStatus);

  // let StarCircleSize = 21;

  // const [showTranslation, setshowTranslation] = React.useState(false);

  let [clipMouseOverToggle, setclipMouseOverToggle] = React.useState(false);
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

  function clipOver(event) {
    setclipMouseOverToggle(!clipMouseOverToggle);
  }

  function clipOut(event) {
    setclipMouseOverToggle(!clipMouseOverToggle);
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
          {showTranslation ? (
            <SentenceDiv
              onClick={handleTranslatedClickedSentence}
              id={translatedUUID}
            >
              <SentenceHighlightedQuebec className="”notranslate”">
                {sentence_object.speaker}: {sentence_object.translated_sentence}
              </SentenceHighlightedQuebec>
            </SentenceDiv>
          ) : (
            <div></div>
          )}
        </SentenceAndSpeaker>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper onMouseEnter={clipOver} onMouseLeave={clipOut}>
        <SentenceAndSpeaker>
          <SentenceDiv
            onClick={handleClickedSentence}
            id={sentence_object.uuid}
          >
            <Sentence width={englishSentenceWidth}>
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

// const ActionButtons = styled.div`
//   width: 50px;
//   position: absolute;
//   padding-top: 15px;
//   display: flex;
// `;

// const StarClipButton = styled.button`
//   background-color: transparent;
//   border: transparent;
//   :hover {
//     cursor: pointer;
//   }
// `;

const ClickMeButton = styled.button`
  outline: none;

  color: ${COLORS_SHOPIFY_YELLOW_PALLETE.Darker};
  background-color: ${COLORS_SHOPIFY_BLUE_PALLETE.Light};
  transform: rotate(-15deg);
  position: absolute;
  border: 0px;
  border-radius: 5px;
  padding: 3px;
  left: 90%;
  z-index: 10;
`;

const Wrapper = styled.div`
  z-index: 2;
  text-align: left;
`;

const SpeakerEnglish = styled.span`
  background-color: #f1ebf585;
  border-radius: 3px;
  padding-bottom: 2px;
  padding-top: 2px;
`;

const SpeakerFrench = styled.span`
  background-color: #f1ebf585;
  border-radius: 3px;
  padding-bottom: 2px;
  padding-top: 2px;
`;

const SentencePlayingDiv = styled.div`
  display: flex;

  flex-direction: row;

  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 10px;
  /*
  @media (max-width: 600px) {
    padding-bottom: 10px;
    /* TODO it's row-reverse because of right-handed mobile operation.  Todo - put in left handed option. 
    flex-direction: row-reverse;
    /* background-color: red; 
    justify-content: flex-end;
  }
  */
`;

const SentenceDiv = styled.div`
  display: flex;
  flex-direction: column;
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
  border-radius: 20px;
  border-left: 1px solid #eaeaea;
  background-color: #fcfcfc;

  border-radius: 5px;
  box-shadow: 3px 3px 10px #d2cdd5;

  color: #1e1e1e;

  background-color: #f2f2f2;

  padding-left: 10px;
  width: 425px;

  /* @media (max-width: 600px) {
    background-color: ${COLORS_SHOPIFY_YELLOW_PALLETE.Lighter};
    padding-left: 11px;

    color: #ffb800;
  } */
`;

const SentenceAndSpeaker = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding-top: 15px;
  padding-left: 40px;
`;

const SentenceAndSpeakerSelected = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding-top: 15px;
  padding-left: 40px;
`;

const Sentence = styled.div`
  padding-left: 11px;
  color: rgba(26, 26, 26);
  width: ${(props) => props.width};

  @media (max-width: 600px) {
    background-color: white;
    padding-left: 11px;
    color: rgba(26, 26, 26);
  }
`;

const SentenceQuebec = styled.div`
  padding-left: 11px;
  color: rgba(26, 26, 26);
  @media (max-width: 600px) {
    background-color: white;
    padding-left: 11px;
    color: rgba(26, 26, 26);
  }
  padding-left: 11px;

  margin-right: 10px;
`;

const SentenceHighlightedQuebec = styled.div`
  border-left: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 3px 3px 10px #d2cdd5;

  color: #1e1e1e;
  background-color: #f2f2f2;

  padding-left: 11px;

  margin-right: 10px;
`;

export default TranscriptSentence;
