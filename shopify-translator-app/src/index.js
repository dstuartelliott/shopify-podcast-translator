import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { PlayerContextProvider } from "./PlayerContext";
import { PlayerBoundariesContextProvider } from "./PlayerBoundariesContext";
import { HighlighterContextProvider } from "./HighlighterContext";

import { SpeechSynthContextProvider } from "./SpeechSynthContext";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { isMobile } from "react-device-detect";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (isMobile) {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <SpeechSynthContextProvider>
          <HighlighterContextProvider>
            <PlayerBoundariesContextProvider>
              <PlayerContextProvider>
                <App />
              </PlayerContextProvider>
            </PlayerBoundariesContextProvider>
          </HighlighterContextProvider>
        </SpeechSynthContextProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <SpeechSynthContextProvider>
          <HighlighterContextProvider>
            <PlayerBoundariesContextProvider>
              <PlayerContextProvider>
                <App />
              </PlayerContextProvider>
            </PlayerBoundariesContextProvider>
          </HighlighterContextProvider>
        </SpeechSynthContextProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
