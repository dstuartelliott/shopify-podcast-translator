import React, { createContext } from "react";

export const DatabaseContext = createContext();
const fetch = require("node-fetch");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const DatabaseContextProvider = ({ children }) => {
  let client, db;

  const getVerifiedToken = async (tokenID) => {
    let myPromise = new Promise((resolve, reject) => {
      // const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords3";

      const apiUrl = "https://www.justheard.ca:8000/verifyToken/" + tokenID;

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

  const getItunesSearchResult = async (tokenID) => {
    let myPromise = new Promise((resolve, reject) => {
      // const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords3";

      // https://itunes.apple.com/search?term=hello&media=podcast

      const apiUrl = "https://itunes.apple.com/search?term=hello&media=podcast";

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
        getVerifiedToken,
        verifyTokenAndSlapItIntoDatabase,
        getItunesSearchResult,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
