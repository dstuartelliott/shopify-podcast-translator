import React from "react";
import styled from "styled-components";
import "./App.css";
import { PlayerContext } from "./PlayerContext";

import TranscriptSentence from "./TranscriptSentence.js";
import SearchResultTranscriptSentence from "./SearchResultTranscriptSentence.js";
import IntroSentence from "./IntroSentence.js";

import { useDispatch } from "react-redux";
import { addTranscript, recordTranslationMP3PlayerState } from "./actions";
import { useSelector } from "react-redux";
import {
  getSimplifiedSentences,
  getTranslationPlaying,
  getTranslationTimeCodeAndUUID,
  getEnglishUUID,
  getMP3PlayerState,
  getSearchResults,
  getTranslationMP3PlayerState,
} from "./reducers";

import {
  COLORS_SHOPIFY_BLUE_PALLETE,
  COLORS_SHOPIFY_GREYS_PALLETE,
  TRANSLATION_MP3_PLAYER_STATES,
} from "./constants.js";

import { isMobile } from "react-device-detect";
import { IoMdLock } from "react-icons/io";

import SpinnerJustKF from "./SpinnerJustKF";

function Scrolltext() {
  const playerContext = React.useContext(PlayerContext);

  const dispatch = useDispatch();

  let simplifiedSentences = useSelector(getSimplifiedSentences);

  const [currentUUID, setcurrentUUID] = React.useState("");

  const [isLoaded, setIsLoaded] = React.useState(false);

  const [playerWasClicked, setplayerWasClicked] = React.useState(false);

  const [translatedAudioSrc, setTranslatedAudioSource] = React.useState(
    "https://us-east-1.linodeobjects.com/podcast-files/1__Merci_79afef9c-2b39-452e-888f-27c63c439374.mp3"
  );

  let translationPlaying = useSelector(getTranslationPlaying);
  let translationTimeCodeUUID = useSelector(getTranslationTimeCodeAndUUID);

  let english_uuid = useSelector(getEnglishUUID);

  let podcast_player_state = useSelector(getMP3PlayerState);
  let translation_podcast_player_state = useSelector(
    getTranslationMP3PlayerState
  );

  let search_results = useSelector(getSearchResults);

  const audioref = React.useRef(null);

  React.useEffect(() => {
    console.log("translationPlaying changed");
    console.log(translationPlaying);

    console.log(audioref);
    console.log(audioref.current);

    console.log(translationTimeCodeUUID);
    let filename =
      "https://us-east-1.linodeobjects.com/podcast-files/" +
      translationTimeCodeUUID.translated_filename;
    console.log(filename);
    setTranslatedAudioSource(filename);
  }, [translationTimeCodeUUID, translationPlaying]);

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

  React.useEffect(() => {
    async function getTranscriptSentences() {
      console.log("expensive transcript operation");

      let combined = await playerContext.getCombined();

      let translated_mp3s = await playerContext.getTranslatedMP3s();

      let numObjs = [];

      translated_mp3s.records.forEach((record) => {
        let translated_mp3_words = record.filename.split("_");
        let number_key = translated_mp3_words[0];
        let word = translated_mp3_words[2];
        let filename = record.filename;
        let text = record.text;
        numObjs[number_key] = { filename, text, word };
      });

      console.log(numObjs);

      let sentenceAndGoodWordCombined = [];
      combined.translations.forEach((element, i) => {
        // // TODO: I could go in and hand correct the data, but I think it's more instructive to show how I deal with bad data

        let ii = 0;
        let succesful_word = undefined;
        while (ii < element.words.length - 1 && succesful_word === undefined) {
          let aligned_word = element.words[ii];

          if (aligned_word.word.case === "success") {
            succesful_word = aligned_word;
          }
          ii = ii + 1;
        }

        let last_word;
        if (element.words[element.words.length - 1].word.case === "success") {
          last_word = element.words[element.words.length - 1];
        } else {
          // is the next word available?
          last_word = undefined;
        }

        let speaker = element.speaker;

        console.log("-........");
        console.log(i);

        // console.log(translated_mp3_record);

        //check the first word in translation

        let translated_filename = "";

        let translation_first_word = element.translation.split(" ")[0];

        if (numObjs[i] !== undefined) {
          console.log({ translation_first_word });

          console.log(numObjs[i].word);

          if (
            translation_first_word === numObjs[i].word &&
            element.translation === numObjs[i].text
          ) {
            console.log("MATCH");
            translated_filename = numObjs[i].filename;
          } else if (translation_first_word !== numObjs[i].word) {
            let matched_from_translated_mp3s = translated_mp3s.records.filter(
              (el) => el.text === element.translation
            );
            console.log("NOPE");
            console.log(element.translation);
            console.log(numObjs[i]);
            console.log(matched_from_translated_mp3s);

            translated_filename = matched_from_translated_mp3s[0].filename;
          }
          console.log(translated_filename);
        } else {
          console.log(
            "--------------------------------------------------undefined!!!!!"
          );
        }

        if (element.speaker.length > 10) {
          let spaces = element.speaker.split(" ");

          if (spaces.length > 3) {
            speaker = combined.translations[i - 1].speaker;
          }
        }

        if (succesful_word !== undefined) {
          sentenceAndGoodWordCombined.push({
            english_sentence: element.english,
            translated_sentence: element.translation,
            speaker: speaker,
            word: succesful_word,
            last_word: last_word,
            // words: element.words,
            // full_sentences_i: element.full_sentences_i,
            uuid: element.uuid,
            // isHighlighted: false,
            // highlightedLang: "none",
            translated_filename: translated_filename,
          });

          setIsLoaded(true);
        }
      });
      console.log(sentenceAndGoodWordCombined[0]);

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
      console.log(sentenceAndGoodWordCombined[0]);

      dispatch(addTranscript(sentenceAndGoodWordCombined));
    }
    getTranscriptSentences();

    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log("english UUID changed");
    console.log(english_uuid);

    let element = document.getElementById(english_uuid);
    if (element !== null && element !== undefined) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
    setcurrentUUID(english_uuid);
  }, [english_uuid]);

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
                    element.uuid === currentUUID && translationPlaying === false
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
                      element.uuid === currentUUID &&
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
                      element.uuid === currentUUID &&
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

  /* ::-webkit-media-controls-timeline-container {
    max-width: 1px;
    max-height: 1px;
  }

  ::-webkit-media-controls-current-time-display {
    display: hidden;
    visibility: hidden;
  }

  ::-webkit-media-controls-time-remaining-display {
    display: hidden;
    visibility: hidden; */
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
    top: 240px;
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
