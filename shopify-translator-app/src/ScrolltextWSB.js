import React from "react";
import styled from "styled-components/macro";
import "./App.css";
import { PlayerContext } from "./Contexts/PlayerContext";

import TranscriptSentence from "./TranscriptSentence.js";
import SearchResultTranscriptSentence from "./SearchResultTranscriptSentence.js";
import IntroSentence from "./IntroSentence.js";

import { useDispatch, useSelector } from "react-redux";
import { recordTranslationMP3PlayerState } from "./actions";
import {
  getSimplifiedSentences,
  getSimplifiedSentencesWSB,
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
  TRANSLATION_MP3_PLAYER_STATES,
} from "./constants.js";

import { isMobile } from "react-device-detect";
import { IoMdLock } from "react-icons/io";

import SpinnerJustKF from "./Singles/SpinnerJustKF";
// import { combineReducers } from "redux";

function ScrolltextWSB(heightOfText) {
  const playerContext = React.useContext(PlayerContext);

  const dispatch = useDispatch();
  const [toggle, setToggle] = React.useState(false);

  let simplifiedSentences = useSelector(getSimplifiedSentencesWSB);

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
      // let computed_transcript = await playerContext.computeTranscript();

      let computed_wsb_transcript = await playerContext.computeWSBTranscript();
      setIsLoaded(true);
    }
    getTranscriptSentences();

    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

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
    setToggle(!toggle);
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
          START HERE TOMMOROW
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
          })
        }
      </TranscriptList>
    </ScrollWrapper>
  );
}

const AudioDivBelow = styled.audio`
  width: 48%;
  height: 20px;
  padding-left: 440px;
  margin-top: -7px;
  z-index: 5;

  position: absolute;
  @media (max-width: 800px) {
    padding-left: 0px;
    width: 80%;
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

const AudioFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const AudioDivBelowTrans = styled.audio`
  width: 50%;
  height: 20px;
  margin-top: -7px;
  z-index: 5;
  align-self: flex-end;
  padding-right: 10px;

  @media (max-width: 800px) {
    padding-right: 0px;

    padding-left: 0px;
    width: 100%;
  }

  ::-webkit-media-controls-panel {
    height: 20px;
    border-radius: 5px;
    background-color: white;
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
  /* max-width: 1800px; */
`;

const TranscriptList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  max-width: 960px;
  transform: translateX(-50px); /* background-color: red; */

  bottom: 20px;
  top: 400px;
  position: absolute;

  @media (max-width: 800px) {
    top: 330px;

    transform: translateX(-10px); /* background-color: red; */
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

export default ScrolltextWSB;
