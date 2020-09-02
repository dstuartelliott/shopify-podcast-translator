import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";

import { PlayerContext } from "./PlayerContext";

let localEndTime = 999999.0;
let currentTimeEndSpeakingFrenchAfter;
function Player({
  timeToJumpTo,
  isSpeechPlaying,
  timeToEndOn,
  pauseAtEndOfCurrentClip,
}) {
  const playerContext = React.useContext(PlayerContext);

  function AnnounceCurrentSentence(e) {
    let time_to_search = e.target.currentTime;
    console.log(time_to_search);
    console.log({ timeToEndOn });
    console.log(pauseAtEndOfCurrentClip);
    if (
      time_to_search > localEndTime && { pauseAtEndOfCurrentClip } &&
      currentTimeEndSpeakingFrenchAfter !== localEndTime
    ) {
      currentTimeEndSpeakingFrenchAfter = localEndTime;

      audioref.current.pause();
      // console.log(playerContext.getSpeechPhrase());
      playerContext.speakFrenchForStoredContextUtterance();
    }
  }

  React.useEffect(() => {
    audioref.current.addEventListener("timeupdate", AnnounceCurrentSentence);

    return () => {
      audioref.current.removeEvenetListener(
        "timeupdate",
        AnnounceCurrentSentence
      );
    };
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
