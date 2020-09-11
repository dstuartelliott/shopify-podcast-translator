import React from "react";
import logo from "./logo.svg";
import Top from "./Top";
import Middle from "./Middle";
import styled from "styled-components";
import Scrolltext from "./Scrolltext";
import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "./r5Audiostyles.css";

function Player() {
  return (
    <PlayerWrapper>
      <AudioPlayer
        src="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/d51660c6-600d-4376-92ea-0e270af97b46/ep374-healthish_tc.mp3"
        customAdditionalControls={[]}
        autoPlay={false}
        customVolumeControls={[]}
        style={{ outline: "none", paddingBottom: "0px" }}
        // customIcons={{ play: noPlay }}
        // other props here
      />
    </PlayerWrapper>
  );
}
const PlayerWrapper = styled.div``;

export default Player;
