import React, { createContext } from "react";

export const DatabaseContext = createContext();
const fetch = require("node-fetch");

export const DatabaseContextProvider = ({ children }) => {
  const getItunesSearchResult = async (search_term) => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = `https://www.justheard.ca:8000/searchForPodcasts/${search_term}`;

      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const verifyTokenAndSlapItIntoDatabase = async (tokenID) => {
    let myPromise = new Promise((resolve, reject) => {
      // const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords3";

      const apiUrl =
        "https:/www.justheard.ca:8001/verifyTokenAndSlapItIntoDatabase/" +
        tokenID;

      // const apiUrl = "https://localhost:8000";

      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          resolve({ error });
        });
    });
    return myPromise;
  };

  return (
    <DatabaseContext.Provider
      value={{
        verifyTokenAndSlapItIntoDatabase,
        getItunesSearchResult,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
