import React from "react";
import "./App.css";
import styled from "styled-components";
import { MP3_PLAYER_STATES, TRANSLATION_MP3_PLAYER_STATES } from "./constants";
import {
  jumpToTime,
  markTranslationAsPlaying,
  markTranslationAsDonePlaying,
  recordMP3PlayerState,
  recordTranslationMP3PlayerState,
  changeUUIDPlaying,
  updateShouldTranslationsAutoPlay,
} from "./actions";
import { useSelector } from "react-redux";

import {
  COLORS_SHOPIFY_BLUE_PALLETE,
  COLORS_FLAG,
  COLORS_SHOPIFY_YELLOW_PALLETE,
} from "./constants.js";

import { getSearchResults, getTranslationMP3PlayerState } from "./reducers";

import { useDispatch } from "react-redux";

function SearchResultTranscriptSentence({
  sentence_object,
  englishHighlighted,
  translatedHightlighted,
  translatedUUID,
  search_phrase,
  original_search_phrase,
}) {
  const dispatch = useDispatch();

  let translationMp3PlayerState = useSelector(getTranslationMP3PlayerState);

  let search_results = useSelector(getSearchResults);

  const [combined_english, setCombined_english] = React.useState([]);

  const [combined_translated, setCombined_translated] = React.useState([]);

  function highlightWordBothCases(
    phrase_lowered,
    phrase_original,
    sentence_to_search
  ) {
    let split_by_lower_case_search_term = sentence_to_search.split(
      phrase_lowered
    );

    let split_with_delim = [];
    split_by_lower_case_search_term.forEach((el, i) => {
      if (i !== split_by_lower_case_search_term.length - 1) {
        split_with_delim.push(el);
        split_with_delim.push(phrase_lowered);
      } else {
        split_with_delim.push(el);
      }
    });

    let final = [];

    split_with_delim.forEach((spel) => {
      let split_with_original = spel.split(phrase_original);

      let split_with_original_with_delim = [];

      split_with_original.forEach((el, i) => {
        if (i !== split_with_original.length - 1) {
          if (i === 0) {
            split_with_original_with_delim.push(el);
            split_with_original_with_delim.push(" " + phrase_original);
          } else {
            split_with_original_with_delim.push(el);
            split_with_original_with_delim.push(phrase_original);
          }
        } else {
          split_with_original_with_delim.push(el);
        }
      });
      split_with_original_with_delim.forEach((spwo) => final.push(spwo));
    });

    return final;
  }

  React.useEffect(() => {
    if (search_phrase.length > 2) {
      let english_highlighted_array = highlightWordBothCases(
        search_phrase,
        original_search_phrase,
        sentence_object.english_sentence
      );

      let translated_highlighted_array = highlightWordBothCases(
        search_phrase,
        original_search_phrase,
        sentence_object.translated_sentence
      );

      setCombined_english(english_highlighted_array);
      setCombined_translated(translated_highlighted_array);
    } else {
      setCombined_english([sentence_object.english_sentence]);
      setCombined_translated([sentence_object.translated_sentence]);
    }

    // eslint-disable-next-line
  }, [search_results]);

  function handleClickedSentence(event) {
    console.log(event);
    dispatch(markTranslationAsDonePlaying());
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));

    dispatch(jumpToTime(sentence_object.start));
  }

  function handleTranslatedClickedSentence(event) {
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
              <SpeakerEnglish>{sentence_object.speaker}</SpeakerEnglish>:{" "}
              {combined_english.map((element, i) => {
                if (
                  element === search_phrase ||
                  element === " " + search_phrase ||
                  element === original_search_phrase ||
                  element === " " + original_search_phrase
                ) {
                  return (
                    <SentenceTextSearchTerm>{element}</SentenceTextSearchTerm>
                  );
                } else {
                  return <span>{element}</span>;
                }
              })}
            </SentenceHighlighted>
          </SentencePlayingDiv>
          <SentencePlayingDiv
            onClick={handleTranslatedClickedSentence}
            id={translatedUUID}
          >
            <Sentence className="”notranslate”">
              <SpeakerFrench>{sentence_object.speaker}</SpeakerFrench>:{" "}
              {combined_translated.map((element, i) => {
                if (
                  element === search_phrase ||
                  element === " " + search_phrase ||
                  element === original_search_phrase ||
                  element === " " + original_search_phrase
                ) {
                  return (
                    <SentenceTextSearchTerm>{element}</SentenceTextSearchTerm>
                  );
                } else {
                  return <span>{element}</span>;
                }
              })}
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
              <SpeakerEnglish>{sentence_object.speaker}</SpeakerEnglish>:{" "}
              {combined_english.map((element, i) => {
                if (
                  element === search_phrase ||
                  element === " " + search_phrase ||
                  element === original_search_phrase ||
                  element === " " + original_search_phrase
                ) {
                  return (
                    <SentenceTextSearchTerm>{element}</SentenceTextSearchTerm>
                  );
                } else {
                  return <span>{element}</span>;
                }
              })}
            </Sentence>
          </SentencePlayingDiv>

          <SentencePlayingDiv
            onClick={handleTranslatedClickedSentence}
            id={translatedUUID}
          >
            <SentenceHighlightedQuebec className="”notranslate”">
              <SpeakerFrench>{sentence_object.speaker}</SpeakerFrench>:{" "}
              {combined_translated.map((element, i) => {
                if (
                  element === search_phrase ||
                  element === " " + search_phrase ||
                  element === original_search_phrase ||
                  element === " " + original_search_phrase
                ) {
                  return (
                    <SentenceTextSearchTerm>{element}</SentenceTextSearchTerm>
                  );
                } else {
                  return <span>{element}</span>;
                }
              })}
            </SentenceHighlightedQuebec>
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
              <SpeakerEnglish>{sentence_object.speaker}</SpeakerEnglish>:{" "}
              {combined_english.map((element, i) => {
                if (
                  element === search_phrase ||
                  element === " " + search_phrase ||
                  element === original_search_phrase ||
                  element === " " + original_search_phrase
                ) {
                  return (
                    <SentenceTextSearchTerm>{element}</SentenceTextSearchTerm>
                  );
                } else {
                  return <span>{element}</span>;
                }
              })}
            </Sentence>
          </SentenceDiv>
          <SentenceDiv
            onClick={handleTranslatedClickedSentence}
            id={translatedUUID}
          >
            <Sentence className="”notranslate”">
              <SpeakerFrench>{sentence_object.speaker}</SpeakerFrench>:{" "}
              {combined_translated.map((element, i) => {
                if (
                  element === search_phrase ||
                  element === " " + search_phrase ||
                  element === original_search_phrase ||
                  element === " " + original_search_phrase
                ) {
                  return (
                    <SentenceTextSearchTerm>{element}</SentenceTextSearchTerm>
                  );
                } else {
                  return <span>{element}</span>;
                }
              })}
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
  padding-bottom: 20px;
  @media (max-width: 600px) {
    padding-bottom: 10px;
    /* TODO it's row-reverse because of right-handed mobile operation.  Todo - put in left handed option. */
    flex-direction: row-reverse;
  }
`;

const SentenceDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding-bottom: 20px;

  @media (max-width: 600px) {
    padding-bottom: 10px;
    /* TODO it's row-reverse because of right-handed mobile operation.  Todo - put in left handed option. */

    flex-direction: row-reverse;
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

const Sentence = styled.div`
  background-color: white;
  padding-left: 11px;
  color: grey;

  @media (max-width: 600px) {
    background-color: white;
    padding-left: 11px;
    color: ${COLORS_SHOPIFY_BLUE_PALLETE.Text};
    margin-right: 0px;
  }
`;

const SentenceTextSearchTerm = styled.span`
  color: ${COLORS_SHOPIFY_BLUE_PALLETE.Dark};
  background-color: ${COLORS_SHOPIFY_BLUE_PALLETE.Light};
`;

const SpeakerEnglish = styled.span`
  /* color: ${COLORS_SHOPIFY_YELLOW_PALLETE.Yellow}; */
  color: ${COLORS_FLAG.Canada};
`;

const SpeakerFrench = styled.span`
  /* color: ${COLORS_SHOPIFY_BLUE_PALLETE.Blue}; */
  color: ${COLORS_FLAG.Quebec};
`;

export default SearchResultTranscriptSentence;
