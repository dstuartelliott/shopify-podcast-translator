import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { SpeechSynthContext } from "./SpeechSynthContext";

import Top from "./Top";
import styled from "styled-components";
import Scrolltext from "./Scrolltext";
import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "./r5Audiostyles.css";
import { MP3_PLAYER_STATES } from "./constants";
import {
  getTimeToJumpTo,
  getUUIDsandTimes,
  getMP3PlayerState,
} from "./reducers";

import {
  addCurrentTime,
  markEnglishAsPlaying,
  recordMP3PlayerState,
  updateWindowDimensions,
} from "./actions";

function Player() {
  const dispatch = useDispatch();

  let mp3PlayerState = useSelector(getMP3PlayerState);

  let uuids_and_times = useSelector(getUUIDsandTimes);

  let timeToJumpTo = useSelector(getTimeToJumpTo);

  const audioref = React.useRef(null);

  const {
    actions: { cancelAllSpeech },
  } = React.useContext(SpeechSynthContext);

  React.useEffect(() => {
    if (mp3PlayerState === MP3_PLAYER_STATES.PLAYING) {
      audioref.current.audio.current.play();
    } else if (mp3PlayerState === MP3_PLAYER_STATES.PAUSED) {
      audioref.current.audio.current.pause();
    }
  }, [mp3PlayerState]);

  React.useEffect(() => {
    console.log("time to jump to useEffect fired");

    if (timeToJumpTo > 0.0) {
      audioref.current.audio.current.currentTime = timeToJumpTo;
    }

    // eslint-disable-next-line
  }, [timeToJumpTo]);

  function announceListen(event) {
    let current_time = event.srcElement.currentTime;

    dispatch(addCurrentTime({ current_time }));
  }

  function onPauseListen(event) {
    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
  }

  function onPlayListen(event) {
    if (mp3PlayerState !== "playing") {
      console.log("onPlayListen");

      console.log(event.srcElement.currentTime);
      cancelAllSpeech();
      console.log(uuids_and_times);

      let array_i;

      // I realize I can do foreach here, but this way I can break early
      for (let i = 0; i < uuids_and_times.length - 1; i++) {
        if (
          uuids_and_times[i].start < event.srcElement.currentTime &&
          uuids_and_times[i].end > event.srcElement.currentTime
        ) {
          console.log("found");
          array_i = i;
        }
      }

      console.log(array_i);
      if (array_i !== undefined) {
        console.log("Player 2 185");

        dispatch(
          markEnglishAsPlaying(
            event.srcElement.currentTime,
            uuids_and_times[array_i].uuid
          )
        );
      } else {
        dispatch(markEnglishAsPlaying(event.srcElement.currentTime, "TBD"));
      }

      dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));

      console.log(event);
    }
  }

  return (
    <PlayerWrapper>
      <AudioPlayer
        src="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/d51660c6-600d-4376-92ea-0e270af97b46/ep374-healthish_tc.mp3"
        customAdditionalControls={[]}
        onPlay={onPlayListen}
        onListen={announceListen}
        listenInterval={200}
        onPause={onPauseListen}
        autoPlay={false}
        customVolumeControls={[]}
        ref={audioref}
        style={{ outline: "none", paddingBottom: "0px" }}
        // customIcons={{ play: noPlay }}
        // other props here
      />
    </PlayerWrapper>
  );
}
const PlayerWrapper = styled.div``;

export default Player;
