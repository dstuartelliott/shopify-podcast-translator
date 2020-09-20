import React, { createContext } from "react";
export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const getCombined = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "https://www.justheard.ca:8000/returnCombined";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getCombined2 = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "https://www.justheard.ca:8000/returnCombined2";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getTranslatedMP3s = async () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords";
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

  const getTranslatedMP3s2 = async () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords2";
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
        getCombined,
        getCombined2,
        getTranslatedMP3s,
        getTranslatedMP3s2,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
