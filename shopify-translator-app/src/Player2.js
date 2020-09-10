import React from "react";
import "./App.css";
import styled from "styled-components";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch } from "react-redux";
import PodcastInfo from "./PodcastInfo.js";
import Modal from "react-overlays/Modal";
import { isMobile } from "react-device-detect";

import {
  jumpToTime,
  addCurrentTime,
  markEnglishAsPlaying,
  recordMP3PlayerState,
  updatePodcastInfoDimensions,
  updateWindowDimensions,
} from "./actions";
import {
  getTimeToJumpTo,
  getUUIDsandTimes,
  getPodcastToggleState,
} from "./reducers";
import { useSelector } from "react-redux";
import { SpeechSynthContext } from "./SpeechSynthContext";
import Transcript from "./Transcript";
import useSize from "@react-hook/size";

function Player2() {
  const dispatch = useDispatch();
  const TopItemsRef = React.useRef(null);
  const AudioDivRef = React.useRef(null);

  let podcast_toggle_state = useSelector(getPodcastToggleState);
  const audioref = React.useRef(null);

  let [TopPartWitdh, TopPartHeight] = useSize(TopItemsRef);
  let [audioWidth, audioHeight] = useSize(AudioDivRef);

  const RandomlyPositionedModal = styled(Modal)`
    position: fixed;
    width: 400px;
    z-index: 1040;
    top: ${() => 50 + 10}%;
    left: ${() => 50 + 10}%;
    border: 1px solid #e5e5e5;
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    padding: 20px;
  `;

  const [show, setShow] = React.useState(false);

  let timeToJumpTo = useSelector(getTimeToJumpTo);

  let uuids_and_times = useSelector(getUUIDsandTimes);
  var noPlay = React.createElement("foo-bar", { className: "bar" }, "");
  const {
    actions: { cancelAllSpeech },
  } = React.useContext(SpeechSynthContext);

  // React.useEffect(() => {
  //   console.log("Player2 useEffect ");
  //   dispatch(updatePodcastInfoDimensions([width, height]));
  // }, []);

  React.useEffect(() => {
    console.log(" toggle state changed");
    console.log(TopPartHeight);
  }, [podcast_toggle_state]);

  // React.useEffect(() => {
  //   dispatch(updatePodcastInfoDimensions([width, height]));
  // }, [podcast_toggle_state]);

  React.useEffect(() => {
    console.log("time to jump to useEffect fired");

    if (timeToJumpTo === -200.0) {
      audioref.current.audio.current.play();
    }

    if (timeToJumpTo === -99.99) {
      audioref.current.audio.current.pause();
    } else if (timeToJumpTo > 0.0) {
      //   console.log(audioref);
      //   console.log(audioref.current);
      //   console.log(audioref.current.audio.current);
      //   console.log(audioref.current.audio.current.currentTime);

      //   console.log("should be jumpinto to " + timeToJumpTo);
      let promise = audioref.current.audio.current.play();
      if (promise !== undefined) {
        promise
          .then((_) => {
            audioref.current.audio.current.currentTime = timeToJumpTo;
            dispatch(jumpToTime(-1.0));

            // Autoplay started!
          })
          .catch((error) => {
            setShow(true);
            console.log("nope");
          });
      }
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

  function getRoomForText(podcastInfoHeight, ControllerHeight) {
    const { innerWidth: width, innerHeight: height } = window;
    let height_for_text = height - (podcastInfoHeight + ControllerHeight);

    // add 20 for the top padding on the TopPart

    console.log(height); // 667
    console.log(podcastInfoHeight); //226
    console.log(ControllerHeight); // 89
    console.log(height_for_text); // 343

    return height_for_text + 40;
  }

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
    console.log([audioWidth, audioHeight]);
    console.log("onPlayListen");
    console.log([TopPartHeight]);

    let room = getRoomForText(TopPartHeight, audioHeight);

    let height_for_text_open = parseInt(room) + "px";

    dispatch(
      updateWindowDimensions({
        height_for_text_open,
      })
    );

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

  if (isMobile) {
    return (
      <div>
        <PlayerWrapper>
          <TopPart ref={TopItemsRef} style={{ paddingTop: "20px" }}>
            <PodcastInfo />

            <PlayerDivMB ref={AudioDivRef}>
              <AudioPlayer
                src="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/d51660c6-600d-4376-92ea-0e270af97b46/ep374-healthish_tc.mp3"
                onPlay={onPlayListen}
                onListen={announceListen}
                onPause={onPauseListen}
                listenInterval={200}
                ref={audioref}
                customAdditionalControls={[]}
                autoPlay={false}
                customVolumeControls={[]}
                showJumpControls={false}
                showControls={false}
                style={{ outline: "none", paddingBottom: "0px" }}
                // customIcons={{ play: noPlay }}
                // other props here
              />
            </PlayerDivMB>
          </TopPart>
          <Transcript></Transcript>
        </PlayerWrapper>
      </div>
    );
  } else {
    return (
      <div>
        <PlayerWrapper>
          <PodcastInfo />

          <PlayerDiv>
            <AudioPlayer
              // src="./ep374-healthish_tc.mp3"
              // src="https://cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/71a9cfe9-dbbd-4572-b3d2-391c3d2f2c85/ep375-purechimp_tc.mp3
              // "

              // controls here: https://static.hanzluo.com/react-h5-audio-player-storybook/index.html?path=/docs/layouts--default-story
              src="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/d51660c6-600d-4376-92ea-0e270af97b46/ep374-healthish_tc.mp3"
              onPlay={onPlayListen}
              onListen={announceListen}
              onPause={onPauseListen}
              listenInterval={200}
              ref={audioref}
              customAdditionalControls={[]}
              autoPlay={false}

              // other props here
            />
          </PlayerDiv>
          <Transcript></Transcript>
        </PlayerWrapper>
      </div>
    );
  }
}

const TopPart = styled.div``;

//Mobile
const PlayerDivMB = styled.div`
  width: 98%;
  padding-top: 10px;
  margin: auto;
`;

const PlayerDiv = styled.div`
  width: 80%;
  margin-left: 140px;
  width: 800px;
  padding-top: 10px;
`;

const PlayerWrapper = styled.div`
  /* position: fixed;
  width: 100%;
  top: 0px;
  z-index: 99;
  background-color: transparent; */
`;

export default Player2;
