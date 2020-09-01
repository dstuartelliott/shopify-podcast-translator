import React, { createContext } from "react";
export const PlayerContext = createContext();
var voices = speechSynthesis.getVoices();
let french_voice = voices.filter((v) => v.lang === "fr-CA");

export const PlayerContextProvider = ({ children }) => {
  const [status, setStatus] = React.useState(null);
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
