import React, { createContext } from "react";
export const PlayerBoundariesContext = createContext();
var voices = speechSynthesis.getVoices();
let french_voice = voices.filter((v) => v.lang === "fr-CA");
let current__play_head_time;
const initialState = {
  shouldMP3StillPlay: false,
  currentTimePlayHead: 0.0,
  timeToPlayFrom: 20.0,
};

function reducer(state, action) {
  switch (action.type) {
    case "update-play-head": {
      //   console.log("reducer triggered");
      //   console.log(action);
      //   console.log(state);

      return {
        ...state,
        // shouldMP3StillPlay: true,
      };
    }

    case "pause-play-head": {
      //   console.log("reducer triggered");
      //   console.log(action);
      //   console.log(state);

      return {
        shouldMP3StillPlay: false,
        ...state,
      };
    }

    case "start-play-head": {
      //   console.log("reducer triggered");
      //   console.log(action);
      //   console.log(state);

      return {
        shouldMP3StillPlay: true,
        ...state,
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

    current__play_head_time = currentTime;
    // console.log(current__play_head_time);

    // dispatch({
    //   type: "update-play-head",
    //   ...data,
    // });
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

  const jumpToEnglishSentenceAndPlay = (data, timeToJumpTo, sentence) => {
    // console.log(timeToJumpTo);
    // console.log(data);

    dispatch({
      type: "pause-play-head",
    });

    let time_jump = parseFloat(timeToJumpTo);

    // console.log(time_jump);

    dispatch({
      type: "jump-to-english-time",
      time_jump,
      ...data,
    });
  };

  const playSpeechAndThenRestartPlayer = (data, utteranceString) => {
    console.log("playSpeech");
    console.log(data);

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

      console.log(event.utterance.text);
    };

    speechSynthesis.speak(utterance);
  };

  return (
    <PlayerBoundariesContext.Provider
      value={{
        state,
        actions: {
          sendUpdatedPlayHeadPosition,
          playSpeechAndThenRestartPlayer,
          pausePlayer,
          startPlayer,
          jumpToEnglishSentenceAndPlay,
        },
      }}
    >
      {children}
    </PlayerBoundariesContext.Provider>
  );
};
