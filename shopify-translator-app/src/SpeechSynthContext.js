import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import {
  jumpToTime,
  markTranslationAsPlaying,
  markTranslationAsDonePlaying,
  markTranslationAsDonePlayingPaused,
  updateSpeechSynthState,
} from "./actions";

let voices = speechSynthesis.getVoices();
console.log(voices);
let french_voice = voices.filter((v) => v.lang === "fr-CA");

export const SpeechSynthContext = createContext();

export const SpeechSynthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const playOrPauseSpeechSynth = () => {
    console.log("playOrPauseSpeechSynth");
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
    dispatch(updateSpeechSynthState(speechSynthesis));
  };

  const cancelAllSpeech = () => {
    speechSynthesis.cancel();
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
          dispatch(markTranslationAsDonePlaying());
          dispatch(jumpToTime(sentence_object.next_start_time));
        }, 1000);
      }
    };

    speechSynthesis.speak(utterance);
    dispatch(jumpToTime(-99.99));
    let new_synth = { ...speechSynthesis };
    console.log(new_synth);
    dispatch(updateSpeechSynthState(new_synth));
  };

  // for(i = 0; i < voices.length ; i++) {
  // }

  // chrome loads the voices later than firefox, so we need to add a listener for when they are loaded. See https://stackoverflow.com/questions/21513706/getting-the-list-of-voices-in-speechsynthesis-web-speech-api

  speechSynthesis.addEventListener("voiceschanged", function () {
    voices = speechSynthesis.getVoices();
    french_voice = voices.filter((v) => v.lang === "fr-CA");
  });

  return (
    <SpeechSynthContext.Provider
      value={{
        actions: {
          playSpeechInSynthContext,
          playOrPauseSpeechSynth,
          cancelAllSpeech,
        },
      }}
    >
      {children}
    </SpeechSynthContext.Provider>
  );
};
