import React, { createContext } from "react";
import { jumpToTime } from "./actions";
import { useDispatch } from "react-redux";
var voices = speechSynthesis.getVoices();
let french_voice = voices.filter((v) => v.lang === "fr-CA");

export const SpeechSynthContext = createContext();

export const SpeechSynthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const playOrPauseSpeechSynth = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  };

  const playSpeechInSynthContext = (sentence_object) => {
    // setUuidToHighLight(sentence_object.uuid, LANGUAGES.FRENCH);
    dispatch(jumpToTime(sentence_object.start));

    speechSynthesis.cancel();

    let utterance = new SpeechSynthesisUtterance(
      sentence_object.translated_sentence
    );
    utterance.voice = french_voice[0];

    utterance.onboundary = function (event) {
      let remaining_words = event.target.text.slice(
        event.charIndex,
        event.target.text.length - 1
      );
      let spaces_left_in_remaining_words = remaining_words.split(" ");

      if (spaces_left_in_remaining_words.length === 1) {
        const timer = setTimeout(() => {
          dispatch(jumpToTime(sentence_object.next_start_time));
        }, 1000);
      }
    };

    speechSynthesis.speak(utterance);
    dispatch(jumpToTime(-99.99));
  };

  return (
    <SpeechSynthContext.Provider
      value={{
        actions: {
          playSpeechInSynthContext,
          playOrPauseSpeechSynth,
        },
      }}
    >
      {children}
    </SpeechSynthContext.Provider>
  );
};
