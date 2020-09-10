import React from "react";
import "./App.css";
import styled from "styled-components";
import { PlayerContext } from "./PlayerContext";
import TranscriptSentence from "./TranscriptSentence.js";
import { useDispatch } from "react-redux";
import { addTranscript, markEnglishAsPlaying } from "./actions";
import { useSelector } from "react-redux";
import {
  getSimplifiedSentences,
  getCurrentTime,
  getUUIDsandTimes,
  getTranslationPlaying,
  getTranslationTimeCodeAndUUID,
  getEnglishUUID,
  getTextSize,
  getPodcastToggleState,
  getPodcastInfoDimensions,
  getMP3PlayerState,
} from "./reducers";
import { isMobile } from "react-device-detect";
import { IoMdLock } from "react-icons/io";

import SpinnerJustKF from "./SpinnerJustKF";

let refs = {};
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  let height_for_text = Math.round(height * 0.66);
  height_for_text = parseInt(height_for_text) + "px";
  return {
    width,
    height,
    height_for_text,
  };
}

function Transcript() {
  const playerContext = React.useContext(PlayerContext);
  const dispatch = useDispatch();
  let simplifiedSentences = useSelector(getSimplifiedSentences);
  let current_time = useSelector(getCurrentTime);
  let uuids_and_times = useSelector(getUUIDsandTimes);
  let podcast_toggle_state = useSelector(getPodcastToggleState);

  let podcast_player_state = useSelector(getMP3PlayerState);

  let podcast_info_collapsed_size = useSelector(getPodcastInfoDimensions);

  let text_size = useSelector(getTextSize);

  let translationPlaying = useSelector(getTranslationPlaying);
  let translationTimeCodeUUID = useSelector(getTranslationTimeCodeAndUUID);
  let english_uuid = useSelector(getEnglishUUID);
  const [currentUUID, setcurrentUUID] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [playerWasClicked, setplayerWasClicked] = React.useState(false);
  // eslint-disable-next-line
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log("Transcript useffect");

    async function getTranscriptSentences() {
      let combined = await playerContext.getCombined();

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

        if (succesful_word !== undefined) {
          // sentenceAndGoodWordCombined.push({
          //   english_sentence: element.english,
          //   translated_sentence: element.translation,
          //   speaker: element.speaker,
          //   word: succesful_word,
          //   last_word: last_word,
          //   words: element.words,
          //   full_sentences_i: element.full_sentences_i,
          //   uuid: element.uuid,
          //   isHighlighted: false,
          //   highlightedLang: "none",
          // });

          sentenceAndGoodWordCombined.push({
            english_sentence: element.english,
            translated_sentence: element.translation,
            speaker: element.speaker,
            word: succesful_word,
            last_word: last_word,
            // words: element.words,
            // full_sentences_i: element.full_sentences_i,
            uuid: element.uuid,
            // isHighlighted: false,
            // highlightedLang: "none",
          });

          setIsLoaded(true);
        }
      });

      console.log("Transcript useffect");

      console.log(combined.translations);
      dispatch(addTranscript(sentenceAndGoodWordCombined));
      sentenceAndGoodWordCombined.forEach((sent) => {
        refs[sent.uuid] = React.createRef();
      });
      console.log(refs);
      //updateContextSentenceAndGoodWordCombined(sentenceAndGoodWordCombined);
    }
    getTranscriptSentences();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log(" useEffect podcast_player_state");
    console.log(podcast_player_state);
    if (
      podcast_player_state === "playing" ||
      podcast_player_state === "paused"
    ) {
      setplayerWasClicked(true);
      console.log("setting player state");
      console.log(podcast_player_state);

      console.log(" toggle state changed");
      console.log(podcast_toggle_state);
      console.log(
        podcast_info_collapsed_size.podcast_info_dimensions.height_collapsed
      );
    }
    // eslint-disable-next-line
  }, [podcast_player_state]);

  React.useEffect(() => {
    let array_i;

    // I realize I can do foreach here, but this way I can break early
    for (let i = 0; i < uuids_and_times.length - 1; i++) {
      if (
        uuids_and_times[i].start < current_time &&
        uuids_and_times[i].end > current_time
      ) {
        array_i = i;
      }
    }
    if (array_i !== undefined) {
      setcurrentUUID(uuids_and_times[array_i].uuid);
      dispatch(
        markEnglishAsPlaying(current_time, uuids_and_times[array_i].uuid)
      );
    }
    // eslint-disable-next-line
  }, [current_time]);

  React.useEffect(() => {
    let element = document.getElementById(english_uuid);
    console.log(english_uuid);
    if (element !== null) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [english_uuid]);

  // Mobile loading
  if (isMobile && isLoaded === false) {
    console.log({ isLoaded });
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

  // Desktop loading
  if (isMobile === false && isLoaded === false) {
    console.log({ isLoaded });
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

  // Mobile version
  if (
    isMobile &&
    isLoaded &&
    podcast_toggle_state.podcast_info_collapsed &&
    playerWasClicked
  ) {
    console.log({ text_size });

    return (
      <TranscriptWrappeMB>
        <Divider>
          <LineMB></LineMB>
          {/* {windowDimensions.height}
          <p></p>
          {windowDimensions.height_for_text} */}
        </Divider>
        <TranscriptListMB textHeight={text_size.open}>
          {simplifiedSentences.map((element, i) => {
            // console.log(element.uuid);
            // console.log(uuidToHighLight);
            return (
              <TranscriptSentence
                sentence_object={element}
                key={element.uuid}
                englishHighlighted={
                  element.uuid === currentUUID && translationPlaying === false
                }
                translatedHightlighted={
                  element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying
                }
                next_start_time={element.next_start_time}
                // highlightedLang={element.highlightedLang}
                // uuidHighlighted={uuidHighlighted}
              ></TranscriptSentence>
            );
          })}
        </TranscriptListMB>

        <FooterHiderForScrollBar> </FooterHiderForScrollBar>
      </TranscriptWrappeMB>
    );
  }

  if (isMobile && playerWasClicked === false) {
    console.log(playerWasClicked);
    return (
      <TranscriptWrappeMB>
        <UnlockWarning>
          <div>
            <IoMdLock size={60} color={"#EEC200"}></IoMdLock>
          </div>
          <WarningText>
            Mobile devices require you to click play first!
          </WarningText>
        </UnlockWarning>
      </TranscriptWrappeMB>
    );
  }

  if (
    isMobile &&
    isLoaded &&
    podcast_toggle_state.podcast_info_collapsed === false
  ) {
    console.log({ text_size });

    return (
      <TranscriptWrappeMB>
        <UnlockWarning>
          <WarningText>
            Minimize the podcast text at the top to reveal the transcript!
          </WarningText>
        </UnlockWarning>
        <FooterHiderForScrollBar> </FooterHiderForScrollBar>
      </TranscriptWrappeMB>
    );
  }

  // Desktop version
  if (isMobile === false && isLoaded) {
    console.log(text_size);
    return (
      <TranscriptWrapper>
        <Divider>
          <Line></Line>
        </Divider>
        <TranscriptList>
          {simplifiedSentences.map((element, i) => {
            // console.log(element.uuid);
            // console.log(uuidToHighLight);
            return (
              <TranscriptSentence
                sentence_object={element}
                key={element.uuid}
                englishHighlighted={
                  element.uuid === currentUUID && translationPlaying === false
                }
                translatedHightlighted={
                  element.uuid === translationTimeCodeUUID.uuid &&
                  translationPlaying
                }
                next_start_time={element.next_start_time}
                // highlightedLang={element.highlightedLang}
                // uuidHighlighted={uuidHighlighted}
              ></TranscriptSentence>
            );
          })}
        </TranscriptList>

        <FooterHiderForScrollBar> </FooterHiderForScrollBar>
      </TranscriptWrapper>
    );
  }
}

const WarningText = styled.div`
  padding: 10px;
  color: ##573b00;
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

const LoadingSpinner = styled.div`
  padding-left: 160px;
`;

const LoadingText = styled.div`
  text-align: center;
`;

const LoadingFlex = styled.div`
  padding-top: 40px;
`;

const Loading = styled.div`
  position: relative;
  top: 350px;
  height: 300px;
  width: 400px;
  margin-left: 350px;
`;

// Mobile

const TranscriptWrappeMB = styled.div`
  background-color: white;
  padding-top: 10px;
`;

const TranscriptListMB = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: ${(props) => props.textHeight};

  overflow: scroll;
  width: 100%;
  scrollbar-width: 10px;
`;

const LineMB = styled.div`
  border-top: 1px solid #eec200;
  margin-left: 20px;
  width: 90%;
`;

// Desktop
const Line = styled.div`
  border-top: 1px solid #eec200;
  margin-left: 130px;
  width: 800px;
`;

const Divider = styled.div`
  padding: 10px;
`;

const FooterHiderForScrollBar = styled.div`
  position: fixed;
  z-index: 99;
  background-color: white;
  height: 15px;
  width: 100%;
  bottom: 0px;
`;

const TranscriptWrapper = styled.div``;

const TranscriptList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 600px;
  overflow: scroll;
  width: 940px;
  scrollbar-width: 10px;
`;

export default Transcript;
