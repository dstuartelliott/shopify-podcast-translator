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

import { COLORS_SHOPIFY_BLUE_PALLETE } from "./constants.js";

import {
  getSynthStateSpeaking,
  getTranslationTimeCodeAndUUID,
  getMP3PlayerState,
  getSearchResults,
} from "./reducers";

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

  let synthSpeaking = useSelector(getSynthStateSpeaking);
  let translationUUID = useSelector(getTranslationTimeCodeAndUUID).uuid;

  let mp3PlayState = useSelector(getMP3PlayerState);

  let search_results = useSelector(getSearchResults);

  const [combined_english, setCombined_english] = React.useState([]);

  const [combined_translated, setCombined_translated] = React.useState([]);

  const {
    actions: {
      playSpeechInSynthContext,
      cancelAllSpeech,
      playOrPauseSpeechSynth,
    },
  } = React.useContext(SpeechSynthContext);

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
    cancelAllSpeech();
    dispatch(markTranslationAsDonePlaying());
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    dispatch(updateSpeechSynthState(false));

    dispatch(jumpToTime(sentence_object.start));
    console.log("------------ markEnglish");

    console.log("TranscriptSentence 136");

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
      markTranslationAsPlaying({
        translation_time_code: sentence_object.start,
        translated_uuid: sentence_object.uuid,
        type_curently_playing: "Translation",
      })
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
              {sentence_object.speaker}:{" "}
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
          <SentencePlayingDiv onClick={handleTranslatedClickedSentence}>
            <Sentence className="”notranslate”">
              {sentence_object.speaker}:{" "}
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
              {sentence_object.speaker}:{" "}
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
              {sentence_object.speaker}:{" "}
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
              {sentence_object.speaker}:
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
          <SentenceDiv onClick={handleTranslatedClickedSentence}>
            <Sentence className="”notranslate”">
              {sentence_object.speaker}:
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

const SentenceTextSearchTerm = styled.span`
  color: ${COLORS_SHOPIFY_BLUE_PALLETE.Dark};
  background-color: ${COLORS_SHOPIFY_BLUE_PALLETE.Light};
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
    /*  no apparent difference */
  }
`;

export default SearchResultTranscriptSentence;
