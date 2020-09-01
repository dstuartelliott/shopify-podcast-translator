import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";

function Player({ timeToJumpTo }) {
  function AnnounceCurrentSentence(e) {
    // let time_to_search = e.target.currentTime;
    // console.log(time_to_search);
  }

  React.useEffect(() => {
    audioref.current.addEventListener("timeupdate", AnnounceCurrentSentence);
    console.log("updated");
  }, []);

  React.useEffect(() => {
    console.log("updated");
    audioref.current.currentTime = timeToJumpTo;
    audioref.current.play();
  });

  const audioref = React.useRef(null);

  return (
    <AudioPlayerDiv>
      <audio
        ref={audioref}
        src="ep374-healthish_tc.mp3"
        currentTime={5}
        controls
      />
      <div>Time to jump to is: {timeToJumpTo}</div>
    </AudioPlayerDiv>
  );

  //   return <ReactAudioPlayer src="ep374-healthish_tc.mp3" autoPlay controls />;
}

const AudioPlayerDiv = styled.div`
  /* width: 800px;
  height: 50px; */

  background-color: white;
  top: 0px;
`;

export default Player;
