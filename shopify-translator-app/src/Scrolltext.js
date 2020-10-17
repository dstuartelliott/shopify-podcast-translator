import React from "react";
import styled from "styled-components";
import "./App.css";
import { PlayerContext } from "./PlayerContext";

import TranscriptSentence from "./TranscriptSentence.js";
import SearchResultTranscriptSentence from "./SearchResultTranscriptSentence.js";
import IntroSentence from "./IntroSentence.js";

import { useDispatch } from "react-redux";
import { recordTranslationMP3PlayerState } from "./actions";
import { useSelector } from "react-redux";
import {
  getSimplifiedSentences,
  getTranslationPlaying,
  getTranslationTimeCodeAndUUID,
  getMP3PlayerState,
  getSearchResults,
  getTranslationMP3PlayerState,
  getUUIDPlaying,
  getShowTranslation,
  getShouldTranslationsAutoPlay,
} from "./reducers";

import { updateShouldTranslationsAutoPlay } from "./actions";

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

  let showTranslation = useSelector(getShowTranslation);

  let shouldTranslationsAutoPlay = useSelector(getShouldTranslationsAutoPlay);

  const audioref = React.useRef(null);

  React.useEffect(() => {
    // let filename =
    //   "https://us-east-1.linodeobjects.com/podcast-files/third/" +
    //   translationTimeCodeUUID.translated_filename;

    let filename =
      "https://us-east-1.linodeobjects.com/podcast-files/pureChimp/" +
      translationTimeCodeUUID.translated_filename;

    setTranslatedAudioSource(filename);
  }, [translationTimeCodeUUID, translationPlaying]);

  // loadup
  React.useEffect(() => {
    async function getTranscriptSentences() {
      // eslint-disable-next-line
      let computed_transcript = await playerContext.computeTranscript();

      setIsLoaded(true);
    }
    getTranscriptSentences();

    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

    console.log(audioref.current);

    if (audioref.current !== null) {
      audioref.current.addEventListener(
        "seeking",
        function () {
          console.log("seeked done");
        },
        true
      );
    }

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log("player state changed");
    console.log(translation_podcast_player_state);
    console.log(audioref.current);

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

  //uuidPlaying
  React.useEffect(() => {
    // console.log("uuidPlaying changed");

    // console.log(shouldTranslationsAutoPlay.shouldTranslationsAutoPlay);
    // console.log(audioref.current);

    if (audioref.current !== null) {
      audioref.current.addEventListener(
        "play",
        function () {
          console.log("translaiton playing");
          dispatch(
            recordTranslationMP3PlayerState(
              TRANSLATION_MP3_PLAYER_STATES.PLAYING
            )
          );
        },
        true
      );

      audioref.current.addEventListener(
        "pause",
        function () {
          console.log("translaiton paused");
          dispatch(
            recordTranslationMP3PlayerState(
              TRANSLATION_MP3_PLAYER_STATES.PAUSED
            )
          );
        },
        true
      );

      // audioref.current.addEventListener(
      //   "seeking",
      //   function () {
      //     console.log("seeking");
      //     console.log(audioref.current.currentTime);
      //   },
      //   true
      // );

      // audioref.current.addEventListener(
      //   "timeupdate",
      //   function () {
      //     console.log(audioref.current.currentTime);
      //   },
      //   true
      // );
    }

    if (uuidPlaying !== undefined) {
      setcurrentUUID(uuidPlaying);

      let element = document.getElementById(uuidPlaying.uuid);
      if (element !== null && element !== undefined) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });

        if (
          shouldTranslationsAutoPlay.shouldTranslationsAutoPlay &&
          audioref.current !== null
        ) {
          audioref.current.onloadeddata = function () {
            console.log("loaded");
            audioref.current.play();
          };
        }
      }
    }

    // eslint-disable-next-line
  }, [uuidPlaying, showTranslation]);

  React.useEffect(() => {
    console.log("showTranslation changed");
    dispatch(updateShouldTranslationsAutoPlay(false));

    if (uuidPlaying !== undefined) {
      setcurrentUUID(uuidPlaying);

      let element = document.getElementById(uuidPlaying.uuid);
      if (element !== null && element !== undefined) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }

    // eslint-disable-next-line
  }, [showTranslation]);

  React.useEffect(() => {
    if (
      podcast_player_state === "playing" ||
      podcast_player_state === "paused"
    ) {
      if (playerWasClicked === false) {
        setplayerWasClicked(true);
        console.log("setting player state");
      }
    }
    // eslint-disable-next-line
  }, [podcast_player_state]);

  if (isMobile && playerWasClicked === false) {
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
                    englishHighlighted={element.uuid === currentUUID.uuid}
                    translatedUUID={element.uuid + "trans"}
                    translatedHightlighted={
                      element.uuid === translationTimeCodeUUID.uuid
                    }
                    next_start_time={element.next_start_time}
                    i_from_list={i}
                  ></TranscriptSentence>
                  {element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying &&
                  showTranslation &&
                  shouldTranslationsAutoPlay.shouldTranslationsAutoPlay ? (
                    <AudioDivBelow
                      controls
                      autoPlay
                      ref={audioref}
                      src={translatedAudioSrc}
                    ></AudioDivBelow>
                  ) : (
                    <div></div>
                  )}
                  {element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying &&
                  showTranslation &&
                  !shouldTranslationsAutoPlay.shouldTranslationsAutoPlay ? (
                    <AudioDivBelow
                      controls
                      ref={audioref}
                      src={translatedAudioSrc}
                    ></AudioDivBelow>
                  ) : (
                    <div></div>
                  )}{" "}
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
                  ></SearchResultTranscriptSentence>

                  {/* I have to do this because when the translations show up again after selecting the quebec flag, I don't want it to autoplay.  However, if the user has clicked on the translation, I do want it to autoplay. */}
                  {element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying &&
                  showTranslation &&
                  shouldTranslationsAutoPlay.shouldTranslationsAutoPlay ? (
                    <AudioDivBelow
                      controls
                      autoPlay
                      ref={audioref}
                      src={translatedAudioSrc}
                    ></AudioDivBelow>
                  ) : (
                    <div></div>
                  )}

                  {element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying &&
                  showTranslation &&
                  !shouldTranslationsAutoPlay.shouldTranslationsAutoPlay ? (
                    <AudioDivBelow
                      controls
                      ref={audioref}
                      src={translatedAudioSrc}
                    ></AudioDivBelow>
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

const AudioDivBelow = styled.audio`
  width: 95%;
  height: 20px;
  padding-left: 0px;

  @media (max-width: 600px) {
    padding-left: 0px;
  }

  ::-webkit-media-controls-panel {
    height: 20px;
    border-radius: 5px;
    background-color: white;
    padding-left: 2px;
  }

  ::-webkit-media-controls-play-button {
    background-color: white;
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
    top: 190px;
    bottom: 20px;
  }

  /* doesn't seem to work on firefox */
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
  padding-left: 11px;
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
