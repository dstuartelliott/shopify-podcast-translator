import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import {
  jumpToTime,
  markTranslationAsPlaying,
  markTranslationAsDonePlaying,
  markTranslationAsDonePlayingPaused,
  updateSpeechSynthState,
} from "./actions";
import { combineReducers } from "redux";

let voices = speechSynthesis.getVoices();
console.log(voices);
let french_voice = voices.filter((v) => v.lang === "fr-CA");
let utterance;
let last_boundary;
let true_remaining_words;
export const SpeechSynthContext = createContext();

export const SpeechSynthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const playOrPauseSpeechSynth = () => {
    console.log("playOrPauseSpeechSynth");
    console.log(speechSynthesis);

    if (speechSynthesis.speaking) {
      console.log("speaking, paused");

      speechSynthesis.cancel();
      console.log(speechSynthesis);

      dispatch(updateSpeechSynthState(false));
    } else {
      console.log(utterance);
      console.log(last_boundary);
      console.log(true_remaining_words);

      utterance = {};
      utterance = new SpeechSynthesisUtterance(true_remaining_words);
      utterance.voice = french_voice[0];

      utterance.onboundary = function (event) {
        let remaining_words = event.target.text.slice(
          event.charIndex,
          event.target.text.length - 1
        );

        // it is debatable if you should resume at the next word or the last word

        // true_remaining_words = event.target.text.slice(
        //   event.charIndex + event.charLength,
        //   event.target.text.length - 1
        // );

        true_remaining_words = event.target.text.slice(
          event.charIndex,
          event.target.text.length - 1
        );

        last_boundary = event;
        let spaces_left_in_remaining_words = remaining_words.split(" ");
        dispatch(updateSpeechSynthState(true));

        if (spaces_left_in_remaining_words.length === 1) {
          const timer = setTimeout(() => {
            dispatch(markTranslationAsDonePlaying());
            // dispatch(jumpToTime(sentence_object.next_start_time));
          }, 1000);
        }
      };

      speechSynthesis.speak(utterance);
      dispatch(jumpToTime(-99.99));
      dispatch(updateSpeechSynthState(speechSynthesis.speaking));
    }
  };

  const cancelAllSpeech = () => {
    speechSynthesis.cancel();
    console.log("speechSynthesis.cancel");
  };

  const playSpeechInSynthContext = (sentence_object) => {
    // setUuidToHighLight(sentence_object.uuid, LANGUAGES.FRENCH);
    dispatch(jumpToTime(sentence_object.start));

    speechSynthesis.cancel();
    console.log("speechSynthesis.cancel");
    utterance = {};
    utterance = new SpeechSynthesisUtterance(
      sentence_object.translated_sentence
    );
    utterance.voice = french_voice[0];

    utterance.onboundary = function (event) {
      let remaining_words = event.target.text.slice(
        event.charIndex,
        event.target.text.length - 1
      );

      true_remaining_words = event.target.text.slice(
        event.charIndex + event.charLength,
        event.target.text.length - 1
      );

      last_boundary = event;
      let spaces_left_in_remaining_words = remaining_words.split(" ");
      dispatch(updateSpeechSynthState(speechSynthesis.speaking));

      if (spaces_left_in_remaining_words.length === 1) {
        const timer = setTimeout(() => {
          dispatch(markTranslationAsDonePlaying());

          // jump to the next one, but this is confusing from a user perspective.
          // dispatch(jumpToTime(sentence_object.next_start_time));
        }, 1000);
      }
    };

    // utterance.onend = function (event) {
    //   dispatch(updateSpeechSynthState(speechSynthesis.speaking));
    // };

    speechSynthesis.speak(utterance);
    dispatch(jumpToTime(-99.99));
    dispatch(updateSpeechSynthState(speechSynthesis.speaking));
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
