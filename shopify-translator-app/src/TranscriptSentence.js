import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { PlayerBoundariesContext } from "./PlayerBoundariesContext";

function TranscriptSentence({ sentence_object, highlighted, showTranslation }) {
  const {
    actions: {
      jumpToEnglishSentenceFromUUID,
      setUuidToHighLight,
      playSpeechAndThenRestartPlayer,
    },
  } = React.useContext(PlayerBoundariesContext);

  React.useEffect(() => {});

  function handleClickedSentence(event) {
    console.log(event);
    setUuidToHighLight(sentence_object.uuid);
    jumpToEnglishSentenceFromUUID(sentence_object.uuid);
  }

  // function handleTranslatedClickedSentence(event) {
  //   console.log(event);
  //   setUuidToHighLight(event.currentTarget.id);
  //   jumpToEnglishSentenceFromUUID(event.currentTarget.id);
  // }

  // playSpeechAndThenRestartPlayer;

  return (
    <Wrapper>
      {highlighted ? (
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </SentenceHighlighted>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </SentenceHighlighted>
          </Button>
        </SentenceAndSpeaker>
      ) : (
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </Sentence>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </Sentence>
          </Button>
        </SentenceAndSpeaker>
      )}
    </Wrapper>
  );
}

const Button = styled.button`
  background-color: Transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
`;

const Wrapper = styled.div`
  z-index: 2;
  text-align: left;
`;

const SentenceAndSpeaker = styled.div``;

const Speaker = styled.div`
  background-color: white;
  text-align: left;
  padding: 10px;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  /* border-bottom: solid 2px white; */
  color: grey;
`;

const Sentence = styled.div`
  background-color: white;
  text-align: left;
  padding: 10px;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  /* border-bottom: solid 2px white; */
  color: grey;
`;

const SentenceHighlighted = styled.div`
  background-color: white;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  /* border-bottom: solid 2px black; */

  text-align: left;
  padding: 10px;
  color: black;
`;

export default TranscriptSentence;
