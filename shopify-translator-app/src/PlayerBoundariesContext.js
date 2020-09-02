import React, { createContext } from "react";
export const PlayerBoundariesContext = createContext();

const initialState = {
  shouldMP3StillPlay: false,
  currentTimePlayHead: 0.0,
};

function reducer(state, action) {
  switch (action.type) {
    case "update-play-head": {
      console.log("reducer triggered");
      console.log(action);
      console.log(state);

      return {
        ...state,
        shouldMP3StillPlay: true,
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

  const sendUpdatedPlayHeadPosition = (data) => {
    console.log("sendUpdatedPlayHeadPosition");
    console.log(data);

    dispatch({
      type: "update-play-head",
      ...data,
    });
  };

  return (
    <PlayerBoundariesContext.Provider
      value={{ state, actions: { sendUpdatedPlayHeadPosition } }}
    >
      {children}
    </PlayerBoundariesContext.Provider>
  );
};
