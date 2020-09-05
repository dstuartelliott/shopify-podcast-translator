import React, { createContext } from "react";
export const PlayerContext = createContext();
var voices = speechSynthesis.getVoices();
let french_voice = voices.filter((v) => v.lang === "fr-CA");
let speechUtterance = "";
export const PlayerContextProvider = ({ children }) => {
  let [speechPhrase, setSpeechPhrase] = React.useState();

  const [status, setStatus] = React.useState(null);

  const getSpeechPhrase = () => {
    return speechUtterance;
  };
  test;
  function setSpeechPhraseFunc(phrase) {
    speechUtterance = phrase;
    console.log("setSpeechPhraseFunc");
    console.log(speechUtterance);
  }

  const getEnglishTextPromise = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:8000/englishText";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          //   console.log(data);
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  function speakFrench(speechToSpeak) {
    let utterance = new SpeechSynthesisUtterance(speechToSpeak);
    utterance.voice = french_voice[0];

    speechSynthesis.speak(utterance);
  }

  function speakFrenchForStoredContextUtterance() {
    console.log("speakFrenchForStoredContextUtterance");
    console.log(speechUtterance);

    let utterance = new SpeechSynthesisUtterance(speechUtterance);
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
  }

  const getTranslateTextPromise = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:8000/translatedText";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          //   console.log(data);
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getCombined = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:8000/returnCombined";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          //   console.log(data);
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  return (
    <PlayerContext.Provider
      value={{
        getEnglishTextPromise,
        getTranslateTextPromise,
        getCombined,
        speakFrench,
        status,
        speechPhrase,
        setSpeechPhraseFunc,
        speechUtterance,
        speakFrenchForStoredContextUtterance,
        getSpeechPhrase,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
