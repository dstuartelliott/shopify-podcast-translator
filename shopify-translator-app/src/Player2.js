import React from "react";
import "./App.css";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch } from "react-redux";
import PodcastInfo from "./PodcastInfo.js";

import {
  jumpToTime,
  addCurrentTime,
  markEnglishAsPlaying,
  recordMP3PlayerState,
} from "./actions";
import { getTimeToJumpTo, getUUIDsandTimes } from "./reducers";
import { useSelector } from "react-redux";
import { SpeechSynthContext } from "./SpeechSynthContext";

function Player2() {
  const dispatch = useDispatch();
  let timeToJumpTo = useSelector(getTimeToJumpTo);

  let uuids_and_times = useSelector(getUUIDsandTimes);

  const audioref = React.useRef(null);

  const {
    actions: { cancelAllSpeech },
  } = React.useContext(SpeechSynthContext);

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
    // eslint-disable-next-line
  }, [timeToJumpTo]);

  // React.useEffect(() => {
  //   if (isTranslationPlaying) {
  //     if (translation_timecode_uuid.timecode > 0) {
  //       audioref.current.audio.current.currentTime =
  //         translation_timecode_uuid.timecode;
  //     }
  //   }
  // }, [translation_timecode_uuid]);

  function announceListen(event) {
    // console.log(event.srcElement.currentTime);
    let current_time = event.srcElement.currentTime;
    let array_i;

    // I realize I can do foreach here, but this way I can break early
    for (let i = 0; i < uuids_and_times.length - 1; i++) {
      if (
        uuids_and_times[i].start < event.srcElement.currentTime &&
        uuids_and_times[i].end > event.srcElement.currentTime
      ) {
        // console.log("found");
        array_i = i;
      }
    }

    if (array_i !== undefined) {
      dispatch(
        markEnglishAsPlaying(
          event.srcElement.currentTime,
          uuids_and_times[array_i].uuid
        )
      );
    }

    dispatch(addCurrentTime({ current_time }));
  }

  function onPauseListen(event) {
    dispatch(recordMP3PlayerState("paused"));
  }

  function onPlayListen(event) {
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
      dispatch(
        markEnglishAsPlaying(
          event.srcElement.currentTime,
          uuids_and_times[array_i].uuid
        )
      );
    } else {
      dispatch(markEnglishAsPlaying(event.srcElement.currentTime, "TBD"));
    }

    dispatch(recordMP3PlayerState("playing"));

    console.log(event);
  }
  return (
    <div>
      <PlayerWrapper>
        <PlayerDiv>
          <AudioPlayer
            // src="./ep374-healthish_tc.mp3"
            // src="https://cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/71a9cfe9-dbbd-4572-b3d2-391c3d2f2c85/ep375-purechimp_tc.mp3
            // "
            src="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/d51660c6-600d-4376-92ea-0e270af97b46/ep374-healthish_tc.mp3"
            onPlay={onPlayListen}
            onListen={announceListen}
            onPause={onPauseListen}
            listenInterval={200}
            ref={audioref}
            // other props here
          />
        </PlayerDiv>
        <PodcastInfo />
      </PlayerWrapper>
    </div>
  );
}

const PlayerDiv = styled.div`
  width: 80%;
  margin-left: 140px;
  max-width: 800px;
`;

const PlayerWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 140px;
  top: 0px;
  z-index: 99;
  background-color: white;
`;

export default Player2;
