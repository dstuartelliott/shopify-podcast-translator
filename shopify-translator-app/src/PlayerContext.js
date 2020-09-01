import React, { createContext } from "react";
export const PlayerContext = createContext();

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

  return (
    <PlayerContext.Provider
      value={{
        getEnglishTextPromise,
        getTranslateTextPromise,
        status,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
