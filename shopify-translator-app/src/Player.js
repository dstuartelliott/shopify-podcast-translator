import React from "react";
import "./App.css";
import styled from "styled-components";

import { PlayerContext } from "./PlayerContext";
import { PlayerBoundariesContext } from "./PlayerBoundariesContext";
import { HighlighterContext } from "./HighlighterContext";

import App from "./App";
let playing = false;

function Player({ timeToJumpTo, timeToEndOn, pauseAtEndOfCurrentClip }) {
  const {
    state: { shouldMP3StillPlay, timeToPlayFrom },
    actions: { sendUpdatedPlayHeadPosition, setTimeToPlayFromToNegative },
  } = React.useContext(PlayerBoundariesContext);

  const highligherContext = React.useContext(HighlighterContext);

  function isPlaying(e) {
    playing = true;
    speechSynthesis.cancel();

    // console.log({ playing });
  }

  function isPaused(e) {
    playing = false;

    // console.log({ playing });
  }

  function updateTime(e) {
    let time_to_search = e.target.currentTime;

    if (playing) {
      sendUpdatedPlayHeadPosition(e.target.currentTime);
      // highligherContext.updateLocalI(e.target.currentTime);
      // highligherContext.current__play_head_time = e.target.currentTime;

      // sendUpdatedPlayHeadPositionToHighighter(e.target.currentTime);
    }

    // console.log(time_to_search);
    // console.log({ timeToEndOn });
    // console.log(pauseAtEndOfCurrentClip);
    // if (
    //   time_to_search > localEndTime && { pauseAtEndOfCurrentClip } &&
    //   currentTimeEndSpeakingFrenchAfter !== localEndTime
    // ) {
    //   currentTimeEndSpeakingFrenchAfter = localEndTime;

    //   audioref.current.pause();
    //   // console.log(playerContext.getSpeechPhrase());
    //   playerContext.speakFrenchForStoredContextUtterance();
    // }
  }

  React.useEffect(() => {
    audioref.current.addEventListener("timeupdate", updateTime);

    audioref.current.addEventListener("play", isPlaying);

    audioref.current.addEventListener("pause", isPaused);

    return () => {
      console.log("remove listener");
      audioref.current.removeEventListener("timeupdate", updateTime);
      audioref.current.removeEventListener("play", isPlaying);
      audioref.current.removeEventListener("pause", isPaused);
    };
  }, []);

  React.useEffect(() => {
    // console.log("Player useeffect fired");
    // // console.log(shouldMP3StillPlay);
    // console.log({ shouldMP3StillPlay });

    if (shouldMP3StillPlay === false) {
      // audioref.current.currentTime = timeToJumpTo;
      // localEndTime = timeToEndOn;
      audioref.current.pause();
      playing = false;
    } else if (shouldMP3StillPlay && playing === true) {
      // console.log("shouldMP3StillPlay && playing === true");

      // console.log({ timeToPlayFrom });
      // let time_jump = parseFloat(timeToPlayFrom);
      // console.log(time_jump);

      // let time_jump_precise = time_jump.toPrecision(2);
      // console.log(time_jump_precise);

      if (timeToPlayFrom > 0) {
        audioref.current.currentTime = timeToPlayFrom;
        setTimeToPlayFromToNegative();
      }

      // I need to change timeToPlayFrom to something that tells the next loop, ignore it

      // localEndTime = timeToEndOn;

      // audioref.current.play();
    } else if (shouldMP3StillPlay && playing === false) {
      // console.log("shouldMP3StillPlay && playing === false");

      // console.log({ timeToPlayFrom });
      // let time_jump = parseFloat(timeToPlayFrom);
      // // console.log(time_jump);

      // let time_jump_precise = time_jump.toPrecision(2);
      // console.log(time_jump_precise);

      audioref.current.currentTime = timeToPlayFrom;
      // localEndTime = timeToEndOn;
      audioref.current.play();
    }
  });

  const audioref = React.useRef(null);

  return (
    <AudioPlayerDiv>
      <audio
        ref={audioref}
        src="ep374-healthish_tc.mp3"
        currentTime={timeToPlayFrom}
        controls
      />
      <div>Time to jump to is: {timeToPlayFrom}</div>
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
