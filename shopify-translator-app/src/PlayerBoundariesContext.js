import React, { createContext } from "react";
import { LANGUAGES } from "./constants";

export const PlayerBoundariesContext = createContext();
var voices = speechSynthesis.getVoices();
let french_voice = voices.filter((v) => v.lang === "fr-CA");
let contextSentenceAndGoodWordCombined = [];

let current = {};

let current_uuid;

const initialState = {
  shouldMP3StillPlay: true,
  currentTimePlayHead: 0.0,
  timeToPlayFrom: 0.0,
  contextSentenceAndGoodWordCombined: [],
  speakTranslation: false,
  uuidToHighlight: "",
  uuidHighlighted: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "time-to-play-from-negative": {
      console.log("time-to-play-from-negative");
      console.log(action);
      console.log(state);

      return {
        ...state,
        timeToPlayFrom: -1.0,
      };
    }

    case "set-uuid": {
      console.log("set-uuid");
      console.log(action.uuid);

      return {
        ...state,
        uuidToHighlight: action.uuid,
        contextSentenceAndGoodWordCombined:
          action.contextSentenceAndGoodWordCombined,
        shouldMP3StillPlay: true,
      };
    }

    case "update-SentenceAndGoodWordCombined": {
      console.log("reducer triggered");
      console.log(action);
      console.log(state);

      contextSentenceAndGoodWordCombined = action.sentenceAndGoodWordCombined;
      return {
        ...state,
        contextSentenceAndGoodWordCombined: action.sentenceAndGoodWordCombined,

        // shouldMP3StillPlay: true,
      };
    }

    case "update-play-head": {
      //   console.log("reducer triggered");
      console.log(action);
      console.log(state);

      return {
        ...state,
        contextSentenceAndGoodWordCombined:
          action.contextSentenceAndGoodWordCombined,
      };
    }

    case "pause-play-head": {
      // console.log(" pause-play-headreducer triggered");
      // console.log(action);
      // console.log(state);

      return {
        ...state,

        shouldMP3StillPlay: false,
      };
    }

    case "start-play-head": {
      //   console.log("reducer triggered");
      //   console.log(action);
      //   console.log(state);

      return {
        ...state,
        shouldMP3StillPlay: true,
      };
    }

    case "jump-to-english-time": {
      //   console.log("reducer triggered");
      //   console.log(action);
      //   console.log(state);
      console.log(action.timeToPlayFrom);

      return {
        ...state,

        shouldMP3StillPlay: true,
        timeToPlayFrom: action.time_jump,
      };
    }

    case "set-speak-translation": {
      //   console.log("reducer triggered");
      //   console.log(action);
      console.log(state);

      return {
        ...state,
        speakTranslation: action.setSpeech,
      };
    }

    case "set-uuuid-highlighted": {
      //   console.log("reducer triggered");
      //   console.log(action);
      console.log("set-uuuid-highlighted");
      console.log(state);
      console.log(action);

      return {
        ...state,
        uuidHighlighted: action.uuidHighlighted,
      };
    }

    default: {
      console.log("error");
      console.log(action);
    }
  }
}

export const PlayerBoundariesContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const sendUpdatedPlayHeadPosition = (currentTime) => {
    // console.log("sendUpdatedPlayHeadPosition");

    console.log(contextSentenceAndGoodWordCombined);

    contextSentenceAndGoodWordCombined.forEach((sent, i) => {
      if (
        sent.last_word !== undefined &&
        sent.word !== undefined &&
        sent.word.word.start < currentTime &&
        sent.last_word.word.end > currentTime
      ) {
        // console.log("found time");
        // console.log(sent);

        current = sent;
      }
    });

    current_uuid = current.uuid;

    console.log(current_uuid);

    dispatch({
      type: "set-uuuid-highlighted",
      uuidHighlighted: current.uuid,
    });

    if (current.word !== undefined) {
    }
  };

  const pausePlayer = () => {
    dispatch({
      type: "pause-play-head",
    });
  };

  const startPlayer = () => {
    dispatch({
      type: "start-play-head",
    });
  };

  const setTimeToPlayFromToNegative = () => {
    dispatch({
      type: "time-to-play-from-negative",
    });
  };

  const setSpeakTranslation = (setSpeech) => {
    dispatch({
      type: "set-speak-translation",
      setSpeech: setSpeech,
    });
  };

  const getContextSentenceAndGoodWordCombined = () => {
    return {};
  };

  const jumpToEnglishSentenceAndPlay = (timeToJumpTo, sentence_object) => {
    // console.log(timeToJumpTo);
    // console.log(data);

    // dispatch({
    //   type: "pause-play-head",
    // });

    current = sentence_object;

    let time_jump = parseFloat(timeToJumpTo);

    // console.log(time_jump);

    dispatch({
      type: "jump-to-english-time",
      time_jump,
    });
  };

  const jumpToEnglishSentenceFromUUID = (uuid) => {
    speechSynthesis.cancel();
    console.log("speechSynthesis.cancel");
    let selected;
    contextSentenceAndGoodWordCombined.forEach((sent, i) => {
      if (sent.uuid === uuid) {
        selected = { sent, i };
      }
    });

    let time_jump = parseFloat(selected.sent.word.word.start);

    dispatch({
      type: "jump-to-english-time",
      time_jump,
    });
  };

  const updateContextSentenceAndGoodWordCombined = (
    sentenceAndGoodWordCombined
  ) => {
    contextSentenceAndGoodWordCombined = sentenceAndGoodWordCombined;

    dispatch({
      type: "update-SentenceAndGoodWordCombined",
      sentenceAndGoodWordCombined: sentenceAndGoodWordCombined,
    });
  };

  const playSpeech = (utteranceString) => {
    speechSynthesis.cancel();
    console.log("speechSynthesis.cancel");

    console.log("playSpeech");

    dispatch({
      type: "pause-play-head",
    });

    let utterance = new SpeechSynthesisUtterance(utteranceString);
    utterance.voice = french_voice[0];

    utterance.onend = function (event) {
      console.log(
        "Utterance has finished being spoken after " +
          event.elapsedTime +
          " milliseconds."
      );

      // jumpToEnglishSentenceAndPlay(nextItem.word.word.start);

      console.log(event.utterance.text);
    };

    speechSynthesis.speak(utterance);
  };

  const setUuidToHighLight = (uuid, language) => {
    console.log(language);
    contextSentenceAndGoodWordCombined = contextSentenceAndGoodWordCombined.map(
      (element) => {
        if (element.uuid === uuid) {
          return { ...element, isHighlighted: true, highlightedLang: language };
        } else {
          return {
            ...element,
            isHighlighted: false,
            highlightedLang: LANGUAGES.NONE,
          };
        }
      }
    );

    console.log(contextSentenceAndGoodWordCombined);

    dispatch({
      type: "set-uuid",
      uuid: uuid,
      contextSentenceAndGoodWordCombined: contextSentenceAndGoodWordCombined,
    });
  };

  return (
    <PlayerBoundariesContext.Provider
      value={{
        state,
        actions: {
          sendUpdatedPlayHeadPosition,
          playSpeech,
          pausePlayer,
          startPlayer,
          jumpToEnglishSentenceAndPlay,
          getContextSentenceAndGoodWordCombined,
          updateContextSentenceAndGoodWordCombined,
          setSpeakTranslation,
          jumpToEnglishSentenceFromUUID,
          setUuidToHighLight,
          setTimeToPlayFromToNegative,
        },
        current_uuid,
      }}
    >
      {children}
    </PlayerBoundariesContext.Provider>
  );
};
