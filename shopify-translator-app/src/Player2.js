import React from "react";
import "./App.css";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch } from "react-redux";
import { addCurrentTime } from "./actions";

function Player2() {
  const dispatch = useDispatch();

  function announceListen(event) {
    console.log(event.srcElement.currentTime);
    let current_time = event.srcElement.currentTime;
    dispatch(addCurrentTime({ current_time }));
  }

  function onPlayListen(event) {
    console.log("onPlayListen");

    console.log(event);
  }

  return (
    <AudioPlayer
      autoPlay
      src="./ep374-healthish_tc.mp3"
      onPlay={onPlayListen}
      onListen={announceListen}
      listenInterval={200}
      // other props here
    />
  );
}

export default Player2;
