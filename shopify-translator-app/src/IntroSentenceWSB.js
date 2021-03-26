import React from "react";
import "./App.css";
import styled from "styled-components/macro";
import { MP3_PLAYER_STATES } from "./constants";
import {
  jumpToTime,
  markTranslationAsDonePlaying,
  markEnglishAsPlaying,
  recordMP3PlayerState,
  updateSpeechSynthState,
} from "./actions";

import {
  COLORS_SHOPIFY_GREYS_PALLETE,
  COLORS_SHOPIFY_BLUE_PALLETE,
} from "./constants.js";

import { useDispatch } from "react-redux";

function IntroSentenceWSB({
  sentence_object,
  highlighted,
  word,
  id,
  next_start_time,
}) {
  const dispatch = useDispatch();

  function handleClickedSentence(event) {
    console.log(event);
    console.log(sentence_object.start);
    console.log(sentence_object);

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
  }

  // this might look ugly, but it's better than a bunch of nesteed ternary statements imho
  // also, I originally had a Button instead of the  SentenceDiv, but then I got a react warning about nesteed buttons so I've opted

  if (highlighted) {
    return (
      <Wrapper>
        <SentenceAndSpeakerSelected>
          <SentencePlayingDiv onClick={handleClickedSentence} id={id}>
            <SentenceHighlighted>{word}</SentenceHighlighted>
          </SentencePlayingDiv>
        </SentenceAndSpeakerSelected>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <SentenceDiv onClick={handleClickedSentence} id={id}>
            <Sentence>{word}</Sentence>
          </SentenceDiv>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  z-index: 2;
  text-align: left;
  margin-left: 47px;
  @media (max-width: 800px) {
    margin-left: 18px;
  }
`;

const SentenceAndSpeaker = styled.div`
  display: flex;
  flex-direction: row;
`;

const SentenceAndSpeakerSelected = styled.div`
  display: flex;
  flex-direction: row;

  background-color: #fcfcfc;
  /* border-bottom: 1px solid ${COLORS_SHOPIFY_GREYS_PALLETE.Sky}; */
  @media (max-width: 800px) {
  }
`;

const SentencePlayingDiv = styled.div`
  display: flex;

  flex-direction: row;
  border: none;
  cursor: pointer;
  z-index: 1;
  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
    /* background-color: blue; */

    /* TODO it's row-reverse because of right-handed mobile operation.  Todo - put in left handed option. */
  }
`;

const SentenceHighlighted = styled.div`
  color: rgba(26, 26, 26);

  @media (max-width: 600px) {
    background-color: white;

    color: rgba(26, 26, 26);
  }
`;

const Sentence = styled.div`
  color: ${COLORS_SHOPIFY_BLUE_PALLETE.Text};

  @media (max-width: 800px) {
    background-color: white;
    color: ${COLORS_SHOPIFY_BLUE_PALLETE.Text};
  }
`;

export default IntroSentenceWSB;
