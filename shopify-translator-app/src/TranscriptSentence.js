import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { PlayerBoundariesContext } from "./PlayerBoundariesContext";
import { LANGUAGES } from "./constants";
let highlighted_french = false;
let highlighted_english = false;

function TranscriptSentence({
  sentence_object,
  highlighted,
  highlightedLang,
  showTranslation,
}) {
  const {
    actions: { jumpToEnglishSentenceFromUUID, setUuidToHighLight, playSpeech },
  } = React.useContext(PlayerBoundariesContext);

  React.useEffect(() => {
    highlighted_french = false;
    highlighted_english = false;

    console.log(highlightedLang);
    if (highlightedLang === "french") {
      console.log("HIGHLIGHTING FRENCH");
      highlighted_french = true;
    }
    if (highlightedLang === "english") {
      console.log("HIGHLIGHTING ENGLISH");

      highlighted_english = true;
    }
  });

  function handleClickedSentence(event) {
    console.log(event);
    setUuidToHighLight(sentence_object.uuid, LANGUAGES.ENGLISH);
    jumpToEnglishSentenceFromUUID(sentence_object.uuid, sentence_object);
  }

  function handleTranslatedClickedSentence(event) {
    console.log(event);
    setUuidToHighLight(sentence_object.uuid, LANGUAGES.FRENCH);
    playSpeech(sentence_object.translated_sentence);
  }

  // this might look ugly, but it's better than nesteed terneries inmho
  if (highlighted && highlightedLang === "french") {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </SentenceHighlighted>
          </Button>
          <Button onClick={handleTranslatedClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
              🇫🇷
              <Button>Play</Button>
            </SentenceHighlighted>
          </Button>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  } else if (highlighted && highlightedLang === "english") {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.english_sentence} 🇨🇦
            </SentenceHighlighted>
          </Button>
          <Button onClick={handleTranslatedClickedSentence}>
            <SentenceHighlighted>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </SentenceHighlighted>
          </Button>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  } else if (!highlighted) {
    return (
      <Wrapper>
        <SentenceAndSpeaker>
          <Button onClick={handleClickedSentence}>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.english_sentence}
            </Sentence>
          </Button>

          <Button onClick={handleTranslatedClickedSentence}>
            <Sentence>
              {sentence_object.speaker}: {sentence_object.translated_sentence}
            </Sentence>
          </Button>
        </SentenceAndSpeaker>
      </Wrapper>
    );
  }
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
