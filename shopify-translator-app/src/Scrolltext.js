import React from "react";
import styled from "styled-components";
import "./App.css";
import { PlayerContext } from "./PlayerContext";

import TranscriptSentence from "./TranscriptSentence.js";
import SearchResultTranscriptSentence from "./SearchResultTranscriptSentence.js";
import IntroSentence from "./IntroSentence.js";

import { useDispatch } from "react-redux";
import {
  addTranscript,
  addUUIDSandTimes,
  recordTranslationMP3PlayerState,
} from "./actions";
import { useSelector } from "react-redux";
import {
  getSimplifiedSentences,
  getTranslationPlaying,
  getTranslationTimeCodeAndUUID,
  getMP3PlayerState,
  getSearchResults,
  getTranslationMP3PlayerState,
  getUUIDPlaying,
} from "./reducers";

import {
  COLORS_SHOPIFY_BLUE_PALLETE,
  COLORS_SHOPIFY_GREYS_PALLETE,
  TRANSLATION_MP3_PLAYER_STATES,
} from "./constants.js";

import { isMobile } from "react-device-detect";
import { IoMdLock } from "react-icons/io";

import SpinnerJustKF from "./SpinnerJustKF";
// import { combineReducers } from "redux";

function Scrolltext() {
  const playerContext = React.useContext(PlayerContext);

  const dispatch = useDispatch();

  let simplifiedSentences = useSelector(getSimplifiedSentences);

  let uuidPlaying = useSelector(getUUIDPlaying);

  const [currentUUID, setcurrentUUID] = React.useState({
    uuid: "intro-uuid",
    start: 0.1,
    end: 77,
  });
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [playerWasClicked, setplayerWasClicked] = React.useState(false);

  const [translatedAudioSrc, setTranslatedAudioSource] = React.useState(
    "https://us-east-1.linodeobjects.com/podcast-files/1__Merci_79afef9c-2b39-452e-888f-27c63c439374.mp3"
  );

  let translationPlaying = useSelector(getTranslationPlaying);
  let translationTimeCodeUUID = useSelector(getTranslationTimeCodeAndUUID);

  let podcast_player_state = useSelector(getMP3PlayerState);
  let translation_podcast_player_state = useSelector(
    getTranslationMP3PlayerState
  );

  let search_results = useSelector(getSearchResults);

  const audioref = React.useRef(null);

  React.useEffect(() => {
    // console.log("translationPlaying changed");
    // console.log(translationPlaying);

    // console.log(audioref);
    // console.log(audioref.current);

    // console.log(translationTimeCodeUUID);
    let filename =
      "https://us-east-1.linodeobjects.com/podcast-files/second/" +
      translationTimeCodeUUID.translated_filename;
    // console.log(filename);
    setTranslatedAudioSource(filename);
  }, [translationTimeCodeUUID, translationPlaying]);

  // loadup
  React.useEffect(() => {
    async function getTranscriptSentences() {
      console.log("expensive transcript operation");

      let combined = await playerContext.getCombined2();

      let sorted_combined = combined.translations.sort(
        (a, b) => a.iteration - b.iteration
      );

      let translated_mp3s = await playerContext.getTranslatedMP3s2();

      let numObjs = [];

      console.log(translated_mp3s);

      console.log(sorted_combined);

      translated_mp3s.records.forEach((record) => {
        let translated_mp3_words = record.filename.split("_");
        let number_key = translated_mp3_words[0];
        let word = translated_mp3_words[2];
        let filename = record.filename;
        let text = record.text;
        numObjs[number_key] = { filename, text, word };
      });

      let sentenceAndGoodWordCombined = [];
      sorted_combined.forEach((element, i) => {
        let speaker = element.speaker;
        //check the first word in translation
        let translated_filename = "";
        let translation_first_word = element.translation.split(" ")[0];
        if (numObjs[i] !== undefined) {
          if (
            translation_first_word === numObjs[i].word &&
            element.translation === numObjs[i].text
          ) {
            translated_filename = numObjs[i].filename;
          } else if (translation_first_word !== numObjs[i].word) {
            let matched_from_translated_mp3s = translated_mp3s.records.filter(
              (el) => el.text === element.translation
            );

            if (matched_from_translated_mp3s[0] === undefined) {
              console.log("");
            }
            translated_filename = matched_from_translated_mp3s[0].filename;
          }
        } else {
          // console.log(
          //   "--------------------------------------------------undefined!!!!!"
          // );
        }

        if (element.speaker === undefined) {
          console.log("");
          speaker = sorted_combined[i - 1].speaker;
        }

        // if (succesful_word !== undefined) {
        //   sentenceAndGoodWordCombined.push({
        //     english_sentence: element.english,
        //     translated_sentence: element.translation,
        //     speaker: speaker,
        //     word: succesful_word,
        //     last_word: last_word,
        //     // words: element.words,
        //     // full_sentences_i: element.full_sentences_i,
        //     uuid: element.uuid,
        //     // isHighlighted: false,
        //     // highlightedLang: "none",
        //     translated_filename: translated_filename,
        //   });

        let first_succesful_word = element.words.find(
          (word) => word.word.case === "success"
        );

        if (first_succesful_word === undefined) {
          first_succesful_word = element.words.find(
            (word) => word.case === "success"
          );
        }

        let reversed = element.words.reverse();
        let last_succesful_word = reversed.find(
          (word) => word.word.case === "success"
        );

        if (last_succesful_word === undefined) {
          last_succesful_word = reversed.find(
            (word) => word.case === "success"
          );
        }

        sentenceAndGoodWordCombined.push({
          english_sentence: element.english,
          translated_sentence: element.translation,
          speaker: speaker,
          word: first_succesful_word,
          last_word: last_succesful_word,
          // words: element.words,
          // full_sentences_i: element.full_sentences_i,
          uuid: element.uuid,
          // isHighlighted: false,
          // highlightedLang: "none",
          translated_filename: translated_filename,
        });
      });

      let intro_section = {
        english_sentence:
          "<Intro> First part of podcast not included in transcript...",
        translated_sentence: "",
        speaker: "",
        word: {
          word: {
            alignedWord: "intro",
            case: "success",
            start: 0.1,
            end: 0.5,
            word: "intro",
          },
        },
        last_word: {
          word: {
            alignedWord: "",
            case: "success",
            start: 76.5,
            end: 77.0,
            word: "",
          },
        },
        uuid: "intro-uuid",
        translated_filename: "none",
      };

      sentenceAndGoodWordCombined.unshift(intro_section);

      dispatch(addTranscript(sentenceAndGoodWordCombined));

      let simplified_time = [];
      sentenceAndGoodWordCombined.forEach((element, i) => {
        // let last_time;
        // if (element.last_word === undefined) {
        //   let next_i = i + 1;
        //   let potential =
        //     sentenceAndGoodWordCombined[next_i].word.word.start - 0.05;
        //   last_time = potential;
        // } else {
        //   last_time = element.last_word.word.end;
        // }

        let start;
        if (element.word.word.start !== undefined) {
          start = element.word.word.start;
        } else {
          if (element.word.start !== undefined) {
            start = element.word.start;
            console.log("start");
          }
        }

        let end;
        if (element.last_word.word.end !== undefined) {
          end = element.last_word.word.end;
        } else {
          if (element.last_word.end !== undefined) {
            end = element.last_word.end;
            console.log("end");
          }
        }

        // let end;

        // if (element.word.word.last_word === undefined) {
        //   end = element.word.last_word.end;
        // } else {
        //   end = element.word.word.last_word.end;
        // }

        simplified_time.push({
          uuid: element.uuid,
          start: start,
          end: end,
        });
      });

      dispatch(addUUIDSandTimes(simplified_time));

      setIsLoaded(true);
    }
    getTranscriptSentences();

    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (audioref.current !== null) {
      if (
        translation_podcast_player_state ===
        TRANSLATION_MP3_PLAYER_STATES.PLAYING
      ) {
        audioref.current.play();
      } else if (
        translation_podcast_player_state ===
        TRANSLATION_MP3_PLAYER_STATES.PAUSED
      ) {
        audioref.current.pause();
      }
    }
  }, [translation_podcast_player_state]);

  //english_uuid;
  // React.useEffect(() => {
  //   console.log("english UUID changed");
  //   console.log(english_uuid);

  //   // let element = document.getElementById(english_uuid);
  //   // if (element !== null && element !== undefined) {
  //   //   element.scrollIntoView({
  //   //     behavior: "smooth",
  //   //     block: "center",
  //   //   });
  //   // }
  //   // setcurrentUUID(english_uuid);
  // }, [english_uuid]);

  //uuidPlaying
  React.useEffect(() => {
    console.log("uuidPlaying changed");
    console.log(uuidPlaying);

    if (uuidPlaying !== undefined) {
      let element = document.getElementById(uuidPlaying.uuid);
      if (element !== null && element !== undefined) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
      setcurrentUUID(uuidPlaying);
    }

    // setcurrentUUID(english_uuid);
  }, [uuidPlaying]);

  React.useEffect(() => {
    // console.log(" useEffect podcast_player_state");
    // console.log(podcast_player_state);
    if (
      podcast_player_state === "playing" ||
      podcast_player_state === "paused"
    ) {
      setplayerWasClicked(true);
      console.log("setting player state");
      // console.log(podcast_player_state);

      // console.log(" toggle state changed");
      // console.log(podcast_toggle_state);
      // console.log(
      //   podcast_info_collapsed_size.podcast_info_dimensions.height_collapsed
      // );
    }
    // eslint-disable-next-line
  }, [podcast_player_state]);

  if (isMobile && playerWasClicked === false) {
    // console.log(playerWasClicked);
    return (
      <UnlockWarning>
        <div>
          <IoMdLock size={60} color={"#EEC200"}></IoMdLock>
        </div>
        <WarningText>
          Mobile devices require you to click play first!
        </WarningText>
      </UnlockWarning>
    );
  }

  if (isLoaded === false) {
    return (
      <Loading>
        <LoadingFlex>
          <LoadingSpinner>
            <SpinnerJustKF></SpinnerJustKF>
          </LoadingSpinner>
          <LoadingText>
            Loading up{" "}
            <a href={"https://www.justheard.ca:8000/returnCombined"}>
              transcript.
            </a>
          </LoadingText>
        </LoadingFlex>
      </Loading>
    );
  }

  return (
    <ScrollWrapper>
      <TranscriptList>
        {
          //eslint-disable-next-line
          simplifiedSentences.map((element, i) => {
            if (i === 0) {
              return (
                <IntroSentence
                  sentence_object={element}
                  key={element.uuid}
                  englishHighlighted={
                    element.uuid === currentUUID.uuid &&
                    translationPlaying === false
                  }
                  translatedUUID={element.uuid + "trans"}
                  translatedHightlighted={
                    element.uuid === translationTimeCodeUUID.uuid &&
                    translationPlaying
                  }
                  next_start_time={element.next_start_time}
                ></IntroSentence>
              );
            }

            if (
              search_results === undefined ||
              search_results.searchResults.filtered_sentences === undefined ||
              search_results.searchResults.filtered_sentences.length === 0
            ) {
              return (
                <div>
                  <TranscriptSentence
                    sentence_object={element}
                    key={element.uuid}
                    englishHighlighted={
                      element.uuid === currentUUID.uuid &&
                      translationPlaying === false
                    }
                    translatedUUID={element.uuid + "trans"}
                    translatedHightlighted={
                      element.uuid === translationTimeCodeUUID.uuid &&
                      translationPlaying
                    }
                    next_start_time={element.next_start_time}
                    // highlightedLang={element.highlightedLang}
                    // uuidHighlighted={uuidHighlighted}
                  ></TranscriptSentence>
                  {element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying ? (
                    <AudioDiv
                      autoPlay
                      ref={audioref}
                      src={translatedAudioSrc}
                    ></AudioDiv>
                  ) : (
                    <div></div>
                  )}
                  {/* <audio
                    controls={
                      element.uuid === translationTimeCodeUUID.uuid &&
                      translationPlaying
                    }
                    ref={audioref}
                    src={translatedAudioSrc}
                  ></audio> */}
                </div>
              );
            } else if (
              search_results.searchResults.filtered_sentences.length > 0 &&
              search_results.searchResults.filtered_sentences.includes(
                element.uuid
              )
            ) {
              return (
                <div>
                  <TimeDividerTop>
                    <TimeText>{element.time_string}</TimeText> <Line></Line>
                  </TimeDividerTop>

                  <SearchResultTranscriptSentence
                    sentence_object={element}
                    key={element.uuid}
                    englishHighlighted={
                      element.uuid === currentUUID.uuid &&
                      translationPlaying === false
                    }
                    translatedUUID={element.uuid + "trans"}
                    translatedHightlighted={
                      element.uuid === translationTimeCodeUUID.uuid &&
                      translationPlaying
                    }
                    next_start_time={element.next_start_time}
                    search_phrase={
                      search_results.searchResults.sentenceSearchText
                    }
                    original_search_phrase={
                      search_results.searchResults.original_search_phrase
                    }
                    // highlightedLang={element.highlightedLang}
                    // uuidHighlighted={uuidHighlighted}
                  ></SearchResultTranscriptSentence>

                  {element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying ? (
                    <AudioDiv
                      autoPlay
                      ref={audioref}
                      src={translatedAudioSrc}
                    ></AudioDiv>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            }
          })
        }
      </TranscriptList>
    </ScrollWrapper>
  );
}

const AudioDiv = styled.audio`
  padding-left: 150px;
  width: 400px;

  @media (max-width: 600px) {
    padding-left: 0px;
  }

  ::-webkit-media-controls-panel {
    background-color: white;
    /* display: flex;
    flex-direction: column; */
  }

  ::-webkit-media-controls-play-button {
  }

  ::-webkit-media-controls-volume-slider-container {
    display: hidden;
    visibility: hidden;
  }
`;
const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 800px;
`;

const TranscriptList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
  width: 97%;
  max-width: 910px;
  overflow-x: hidden; //horizontal

  bottom: 20px;
  top: 230px;
  position: absolute;

  @media (min-width: 675px) {
    bottom: 20px;
    top: 200px;
    position: absolute;
  }

  @media (max-width: 600px) {
    top: 180px;
    bottom: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${COLORS_SHOPIFY_GREYS_PALLETE.Light};
    border-radius: 10px;
    border-top: 2px solid ${COLORS_SHOPIFY_GREYS_PALLETE.Sky};
    border-bottom: 2px solid ${COLORS_SHOPIFY_GREYS_PALLETE.Sky};
  }

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 20px;
    background-color: ${COLORS_SHOPIFY_GREYS_PALLETE.Lighter};
    height: 30px;
    position: absolute;
    top: 10px;

    @media (max-width: 600px) {
      /* position: fixed;
      top: 200px;
      bottom: 20px; */
    }
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    /* box-shadow: inset 0 0 3px ${COLORS_SHOPIFY_BLUE_PALLETE.Blue}; */
    border-radius: 20px;
    background-color: ${COLORS_SHOPIFY_GREYS_PALLETE.Sky};
  }
`;

const Line = styled.div`
  border-bottom: 1px dashed ${COLORS_SHOPIFY_BLUE_PALLETE.Blue};
  height: 1px;
  flex-grow: 2;
  padding-top: 9px;
`;

const TimeDividerTop = styled.div`
  padding-left: 150px;
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    padding-left: 10px;
  }
`;

const TimeText = styled.div`
  padding-bottom: 10px;
  color: ${COLORS_SHOPIFY_BLUE_PALLETE.Dark};
  padding-right: 5px;
`;

const LoadingText = styled.div``;

const LoadingFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  max-width: 1000px;
  background-color: white;
  padding-top: 20px;
`;

const LoadingSpinner = styled.div`
  padding-left: 20px;
`;

const WarningText = styled.div`
  padding: 10px;
  /* color: #573b00; */
`;

const UnlockWarning = styled.div`
  width: 250px;
  background-color: #f4f6f8;
  border-radius: 10px;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export default Scrolltext;
