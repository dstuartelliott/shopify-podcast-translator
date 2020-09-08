import React, { createContext } from "react";

export const HighlighterContext = createContext();
let localSentenceAndGoodWordCombined = [];
let current = {};
let current__play_head_time;
let current_local_uuid;
const initialState = {
  uuidHighlightedIndivContext: "100",
};

function reducer(state, action) {
  switch (action.type) {
    case "set-uuuid-highlighted007": {
      //   console.log("reducer triggered");
      //   console.log(action);
      console.log("set-uuuid-highlighted007");
      console.log(state);
      console.log(action);

      return {
        ...state,
        uuidHighlightedIndivContext: action.uuidHighlightedIndivContext,
      };
    }

    default: {
      console.log("error");
      console.log(action);
    }
  }
}

export const HighlighterContextProvider = ({ children }) => {
  const updateUUID = (uuid) => {
    console.log("updateUUID");

    dispatch({
      type: "set-uuuid-highlighted007",
      uuidHighlightedIndivContext: uuid,
    });
  };

  const updateLocalI = (currentTime) => {
    console.log("sendUpdatedPlayHeadPosition");

    current__play_head_time = currentTime;
    console.log(current__play_head_time);

    localSentenceAndGoodWordCombined.forEach((sent, i) => {
      if (
        sent.word.word.start < currentTime &&
        sent.last_word.word.end > currentTime
      ) {
        // console.log("found time");
        // console.log(sent);

        current = sent;
      }
    });

    current_local_uuid = current.uuid;
    console.log(current_local_uuid);

    // dispatch({
    //   type: "set-uuuid-highlighted007",
    //   uuidHighlightedIndivContext: current.uuid,
    // });
  };

  const returnSomething = () => {
    localSentenceAndGoodWordCombined.forEach((sent, i) => {
      if (
        sent.word.word.start < current__play_head_time &&
        sent.last_word.word.end > current__play_head_time
      ) {
        // console.log("found time");
        // console.log(sent);

        current = sent;
      }
    });

    current_local_uuid = current.uuid;

    return current__play_head_time;
  };

  const updateContextSentenceAndGoodWordCombined = (
    sentenceAndGoodWordCombined
  ) => {
    localSentenceAndGoodWordCombined = sentenceAndGoodWordCombined;
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <HighlighterContext.Provider
      value={{
        state,
        actions: {
          updateContextSentenceAndGoodWordCombined,
          updateUUID,
        },
        current__play_head_time,
        updateLocalI,
        returnSomething,
      }}
    >
      {children}
    </HighlighterContext.Provider>
  );
};
