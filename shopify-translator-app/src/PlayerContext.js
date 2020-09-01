import React, { createContext } from "react";
export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [status, setStatus] = React.useState(null);
  const getMyProfilePromise = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "http://localhost:8000/translations";
      fetch(apiUrl, { method: "GET", mode: "no-cors" })
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          console.log(data);
          //resolve(data);
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
        getMyProfilePromise,
        status,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
