import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";

function Player() {
  function AnnounceCurrentSentence(e) {
    let time_to_search = e.target.currentTime;
    console.log(time_to_search);
  }

  React.useEffect(() => {
    audioref.current.addEventListener("timeupdate", AnnounceCurrentSentence);
  }, []);
  const audioref = React.useRef(null);

  return (
    <AudioPlayerDiv>
      <audio ref={audioref} src="ep374-healthish_tc.mp3" controls />{" "}
    </AudioPlayerDiv>
  );

  //   return <ReactAudioPlayer src="ep374-healthish_tc.mp3" autoPlay controls />;
}

const AudioPlayerDiv = styled.div`
  width: 800px;
  height: 50px;

  background-color: white;
  top: 0px;
`;

export default Player;
