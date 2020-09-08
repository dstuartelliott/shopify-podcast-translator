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
} from "./reducers";
import { isMobile } from "react-device-detect";

import SpinnerJustKF from "./SpinnerJustKF";

let refs = {};

function Transcript() {
  const playerContext = React.useContext(PlayerContext);
  const dispatch = useDispatch();
  let simplifiedSentences = useSelector(getSimplifiedSentences);
  let current_time = useSelector(getCurrentTime);
  let uuids_and_times = useSelector(getUUIDsandTimes);

  let translationPlaying = useSelector(getTranslationPlaying);
  let translationTimeCodeUUID = useSelector(getTranslationTimeCodeAndUUID);
  let english_uuid = useSelector(getEnglishUUID);
  const [currentUUID, setcurrentUUID] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
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
    // eslint-disable-next-line
  }, []);

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

  function ScrollToBottom() {
    let element = document.getElementById(
      "ddcec5dc-f824-4a60-94d1-30aa6e841b28"
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    console.log(element);
    console.log("ScrollToBottom");
  }

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
  if (isMobile == false && isLoaded === false) {
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
  if (isMobile && isLoaded) {
    return (
      <TranscriptWrapper>
        <Divider>
          <LineMB></LineMB>
        </Divider>
        <TranscriptListMB>
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
      </TranscriptWrapper>
    );
  }

  // Desktop version
  if (isMobile == false && isLoaded) {
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

const TranscriptListMB = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 600px;
  overflow: scroll;
  width: 80%;
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
