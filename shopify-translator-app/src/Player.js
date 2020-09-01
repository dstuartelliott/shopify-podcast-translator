import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
let localEndTime = 999999.0;
function Player({
  timeToJumpTo,
  isSpeechPlaying,
  timeToEndOn,
  pauseAtEndOfCurrentClip,
}) {
  function AnnounceCurrentSentence(e) {
    let time_to_search = e.target.currentTime;
    console.log(time_to_search);
    console.log({ timeToEndOn });
    console.log(pauseAtEndOfCurrentClip);

    if (time_to_search > localEndTime && { pauseAtEndOfCurrentClip }) {
      audioref.current.pause();

      HERE IS WHERE YOU WANT TO SEND A MESSAGE TO CONTEXT TO PLAY THE FRENCH
    }
  }

  React.useEffect(() => {
    audioref.current.addEventListener("timeupdate", AnnounceCurrentSentence);
    console.log("updated");
  }, []);

  React.useEffect(() => {
    console.log("updated");
    if (isSpeechPlaying === false) {
      audioref.current.currentTime = timeToJumpTo;
      localEndTime = timeToEndOn;
      audioref.current.play();
    }
  });

  const audioref = React.useRef(null);

  return (
    <AudioPlayerDiv>
      <audio
        ref={audioref}
        src="ep374-healthish_tc.mp3"
        currentTime={timeToJumpTo}
        controls
      />
      <div>Time to jump to is: {timeToJumpTo}</div>
      <div>Time to end on is: {timeToEndOn}</div>
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
