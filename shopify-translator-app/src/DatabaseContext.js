import React, { createContext } from "react";

const { MongoClient } = require("mongodb");

export const DatabaseContext = createContext();
require("dotenv").config();
const fetch = require("node-fetch");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const DatabaseContextProvider = ({ children }) => {
  let client, db;
  const initialAuthSend = async (googleAuth) => {
    try {
      client = await MongoClient(MONGO_URI, options);
      await client.connect();
      db = client.db("users");

      let oneUpdated = await db
        .collection("user_records")
        .updateOne(
          { _id: googleAuth.userid },
          { $set: { payload: googleAuth.payload } }
        );

      console.info(oneUpdated);

      return oneUpdated;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      client.close();
    }
  };

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

  const getVerifiedTokenLocal = async (tokenID) => {
    let myPromise = new Promise((resolve, reject) => {
      // const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords3";

      const apiUrl = "http://localhost:8000/verifyToken/" + tokenID;

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
        initialAuthSend,
        getVerifiedToken,
        verifyTokenAndSlapItIntoDatabase,
        getVerifiedTokenLocal,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
