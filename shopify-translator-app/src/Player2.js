import React from "react";
import "./App.css";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch } from "react-redux";
import { jumpToTime, addCurrentTime } from "./actions";
import { getTimeToJumpTo } from "./reducers";
import { useSelector } from "react-redux";
import { PlayerContext } from "./PlayerContext";

function Player2() {
  const dispatch = useDispatch();
  let timeToJumpTo = useSelector(getTimeToJumpTo);

  const audioref = React.useRef(null);

  React.useEffect(() => {
    console.log("time to jump to useEffect fired");
    if (timeToJumpTo === -99.99) {
      audioref.current.audio.current.pause();
    } else if (timeToJumpTo > 0.0) {
      //   console.log(audioref);
      //   console.log(audioref.current);
      //   console.log(audioref.current.audio.current);
      //   console.log(audioref.current.audio.current.currentTime);

      audioref.current.audio.current.currentTime = timeToJumpTo;
      //   console.log("should be jumpinto to " + timeToJumpTo);
      audioref.current.audio.current.play();
      dispatch(jumpToTime(-1.0));
    }
  }, [timeToJumpTo]);

  function announceListen(event) {
    // console.log(event.srcElement.currentTime);
    let current_time = event.srcElement.currentTime;
    dispatch(addCurrentTime({ current_time }));
  }

  function onPlayListen(event) {
    console.log("onPlayListen");

    console.log(event);
  }

  return (
    <div>
      <AudioPlayer
        autoPlay
        src="./ep374-healthish_tc.mp3"
        onPlay={onPlayListen}
        onListen={announceListen}
        listenInterval={200}
        ref={audioref}
        // other props here
      />
    </div>
  );
}

export default Player2;
