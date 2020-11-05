import React from "react";
import styled from "styled-components/macro";
import HeroSrc from "./images/bullseye-logo.jpg";
import TeenyBurger from "./images/TeenyBurger.svg";
import TeenyHeart from "./images/TeenyHeart.svg";
import DropDown from "./images/DropDown.png";
import CircleSun from "./images/CircleSun.svg";
import CircleOver from "./images/circle_over2.svg";
import PauseImage from "./images/pause.svg";
import { Spring } from "react-spring/renderprops";
import PlayImage from "./images/Play.svg";

import TopSearch from "./TopSearch";
import { BiPlayCircle, BiPauseCircle, BiMenu } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import TestMenu from "./TestMenu";
import PlayerHTMLFigma from "./PlayerHTMLFigma";
import Doughnut from "./Doughnut";
import Draggable from "react-draggable";
import { useSpring, animated } from "react-spring";
import {
  getMP3PlayerState,
  getTimeToJumpTo,
  getUUIDsandTimes,
  getTranslationPlaying,
  getShowTranslation,
} from "./reducers";

import {
  recordMP3PlayerState,
  recordTranslationMP3PlayerState,
  addCurrentTime,
  jumpToTime,
  changeUUIDPlaying,
} from "./actions";

import { MP3_PLAYER_STATES, TRANSLATION_MP3_PLAYER_STATES } from "./constants";
import useResizeAware from "react-resize-aware";

let sizeOfJogArea;
let last_time_frame = 0.0;
// eslint-disable-next-line
let current_uuid;
let isloaded = false;
let areaOfScrollBar;
let dragging = false;

let ProgressBarOver = false;

function Player() {
  let mp3PlayerState = useSelector(getMP3PlayerState);
  const dispatch = useDispatch();
  const [resizeListenerProgressBar, sizes] = useResizeAware();

  const circleRef = React.useRef(null);

  let timeToJumpTo = useSelector(getTimeToJumpTo);

  let translationPlaying = useSelector(getTranslationPlaying);

  let seeking = false;

  let uuids_and_times = useSelector(getUUIDsandTimes);

  let showTranslation = useSelector(getShowTranslation);
  let audioref = React.useRef(null);

  let [audioPercentage, setAudioPercentage] = React.useState(`1%`);
  let [audioCirclePosition, setAudioCirclePosition] = React.useState({
    x: 0,
    y: 0,
  });

  let [dragPercentage, setDragPercentage] = React.useState("100, 0");

  let [showProgressWheel, setshowProgressWheel] = React.useState(false);

  sizeOfJogArea = sizes.width - 115 - 10;

  areaOfScrollBar = sizeOfJogArea - 30;

  React.useEffect(() => {
    switch (mp3PlayerState) {
      case MP3_PLAYER_STATES.PLAYING:
        if (audioref.current.paused) {
          audioref.current.play();
        }
        break;

      case MP3_PLAYER_STATES.PAUSED:
        if (!audioref.current.paused) {
          audioref.current.pause();
        }

        break;
    }
  }, [mp3PlayerState]);

  React.useEffect(() => {
    if (timeToJumpTo > 0.0) {
      audioref.current.currentTime = timeToJumpTo;
      // audioref.current.audio.current.currentTime = timeToJumpTo;
    }

    // eslint-disable-next-line
  }, [timeToJumpTo]);

  function playButtonHit() {
    console.log("hit");
    console.log(mp3PlayerState);

    if (mp3PlayerState === MP3_PLAYER_STATES.PAUSED) {
      dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
      dispatch(
        recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
      );
    } else if (mp3PlayerState === MP3_PLAYER_STATES.PLAYING) {
      {
        dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
        dispatch(
          recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
        );
      }
    }
  }

  function quickishFindUUID(current_time) {
    // console.log(uuids_and_times);
    if (uuids_and_times !== undefined) {
      let uuid = uuids_and_times.find(
        (element) => current_time > element.start && current_time < element.end
      );

      // console.log(current_time);
      // console.log(uuid);

      if (uuid !== undefined) {
        // console.log("PlayerHTMLFigma 80");
        // console.log(uuid);
        // console.log(translationPlaying);
        // console.log(current_uuid);

        let trans_uuid = uuid.uuid + "trans";

        current_uuid = uuid;
        translationPlaying
          ? dispatch(changeUUIDPlaying({ ...uuid, uuid: trans_uuid }))
          : dispatch(changeUUIDPlaying(uuid));
      }
    }
  }

  function announceListen(event) {
    if (event !== undefined) {
      // console.log(event.nativeEvent.target);
      let percentage =
        event.nativeEvent.target.currentTime /
        event.nativeEvent.target.duration;
      let audioPer = percentage * 100;
      // console.log(percentage);

      if (dragging === false) {
        let circle_x = percentage * (sizeOfJogArea - 30);
        setAudioCirclePosition({ x: circle_x, y: 0 });
      }

      if (percentage < 1.0) {
        // setAudioPercentage("1%");
        // setAudioCirclePosition(0.03);
      } else {
        setAudioPercentage(audioPer + "%");

        // setAudioCirclePosition(percentage);
      }

      if (seeking === false) {
        let current_time = audioref.current.currentTime;
        // console.log(uuids_and_times);

        dispatch(addCurrentTime({ current_time }));
        quickishFindUUID(current_time);

        // if (Math.abs(last_time_frame - current_time) > 2.0) {
        // }

        last_time_frame = current_time;
      }
    }
  }

  function seekingHappening() {
    seeking = true;
  }

  function seekingDone() {
    seeking = false;
    announceListen();
  }

  function ableToPlay() {
    console.log("ableToPlay");
    if (!isloaded) {
      if (
        audioref.currentTime !== undefined &&
        audioref.currentTime.paused === false
      ) {
        dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
      } else {
        dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
      }

      isloaded = true;
    }

    // do somethinf for buffering here
  }

  function loadingStarted(event) {
    console.log("loadingStarted");

    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.LOADING));
  }

  function handleStop(event, data) {
    console.log("Stop");
    // console.log(data.lastX);

    let percentage = data.lastX / areaOfScrollBar;
    console.log(percentage);

    // let circle_x = percentage * (sizeOfJogArea - 30);
    setAudioCirclePosition({ x: data.lastX, y: 0 });
    setAudioPercentage(percentage * 100 + "%");

    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

    console.log(audioref.current.duration * percentage);
    dispatch(jumpToTime(audioref.current.duration * percentage));
    // console.log(event.clientX);
    dragging = false;

    // console.log(sizeOfJogArea - 30);
    // console.log(sizeOfJogArea);
  }
  function handleDrag(event, data) {
    let percentage = (data.lastX / areaOfScrollBar) * 100;
    console.log(percentage);
    let remaining = 100 - percentage;
    setDragPercentage(percentage);
    dragging = true;
  }

  function handleInvisibleProgressButtonClicl(event) {
    let left_start =
      event.clientX -
      (event.currentTarget.offsetParent.offsetLeft +
        event.currentTarget.offsetLeft);

    let percentage = left_start / sizeOfJogArea;
    console.log(percentage * 100);

    let remaining = 100 - percentage * 100;

    setDragPercentage(percentage * 100 + " ," + remaining);

    console.log(left_start);

    setAudioCirclePosition({ x: left_start, y: 0 });
    setAudioPercentage(percentage * 100 + "%");

    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

    // console.log(audioref.current.duration * percentage);
    dispatch(jumpToTime(audioref.current.duration * percentage));
    dragging = false;
  }

  function handleHoverBar() {
    setshowProgressWheel(true);
  }
  function handleOutBar() {
    setshowProgressWheel(false);
  }

  return (
    <Wrapper onMouseEnter={handleOutBar}>
      {console.log(ProgressBarOver)}
      <CircleSunDiv
        image_source={CircleSun}
        image_over_source={CircleOver}
        alt="Circle Background behind play button"
        onClick={playButtonHit}
        opacity={showProgressWheel ? 0 : 100}
      >
        <PlayerTriangleImgFlex>
          {mp3PlayerState === MP3_PLAYER_STATES.PLAYING ? (
            <PauseImageDiv src={PauseImage}></PauseImageDiv>
          ) : (
            <PlayImageDiv src={PlayImage}></PlayImageDiv>
          )}
        </PlayerTriangleImgFlex>
      </CircleSunDiv>
      <DoughnutDiv>
        <Doughnut doughnutValues={dragPercentage}>hello</Doughnut>
      </DoughnutDiv>

      <ProgressBarDiv>
        {resizeListenerProgressBar}

        <PlayerWrapper id={"hello"}>
          <PlayerDiv>
            <AudioDivBelow
              ref={audioref}
              src="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/71a9cfe9-dbbd-4572-b3d2-391c3d2f2c85/ep375-purechimp_tc.mp3"
              // onPlay={playerPlay}
              // onPause={playerPause}
              onSeeking={seekingHappening}
              onSeeked={seekingDone}
              onTimeUpdate={announceListen}
              onCanPlay={ableToPlay}
              onLoadStart={loadingStarted}
            ></AudioDivBelow>
          </PlayerDiv>
          <InvisibleProgressButton
            sizeLength={sizeOfJogArea + "px"}
            onClick={handleInvisibleProgressButtonClicl}
            onMouseEnter={handleHoverBar}
            onMouseLeave={handleOutBar}
          ></InvisibleProgressButton>
          <ProgressBar>
            {/* {console.log({ audioPercentage })} */}
            <ProgressBarFiller audioPercentage={audioPercentage}>
              <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={audioCirclePosition}
                scale={1}
                bounds={{ left: 0, right: sizeOfJogArea - 30 }}
                // onStart={this.handleStart}
                onDrag={handleDrag}
                onStop={handleStop}
              >
                <div>
                  <ProgressBarCircle
                    className="handle"
                    ref={circleRef}
                    onMouseEnter={handleHoverBar}
                    onMouseLeave={handleOutBar}
                  ></ProgressBarCircle>
                </div>
              </Draggable>
            </ProgressBarFiller>
          </ProgressBar>
        </PlayerWrapper>

        {/* <PlayerHTMLFigma
          sizeOfJogArea={sizes.width - 115 - 10}
        ></PlayerHTMLFigma> */}
      </ProgressBarDiv>
    </Wrapper>
  );
}

const DoughnutDiv = styled.div`
  position: absolute;
  left: -12px;
`;

const InvisibleProgressButton = styled.button`
  position: absolute;
  width: ${(props) => props.sizeLength};
  background-color: transparent;
  :hover {
    background-color: transparent;
  }
  height: 100px;
`;

const ProgressBar = styled.div`
  height: 10px;
  border-radius: 13px;
  width: 100%;
`;

const ProgressBarFiller = styled.div`
  background-color: #aea8b2;
  height: 15px;
  border-radius: inherit;
  transition: width 0.3s ease-out;

  width: ${(props) => props.audioPercentage};

  /* width: 10%; */
`;

const ProgressBarCircle = styled.button`
  background-color: white;
  width: 30px;
  height: 30px;
  position: absolute;
  left: ${(props) => props.audioPercentage};
  top: -8px;
  z-index: 6;
  border: solid 1px #aea8b2;
  border-radius: 30px;
  :hover {
    background-color: white;
  }

  /* width: 10%; */
`;

const AudioDivBelow = styled.audio`
  /* width: 95%;
  height: 20px;
  padding-left: 0px;

  @media (max-width: 600px) {
    padding-left: 0px;
  } */
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5px;
`;

const PlayerDiv = styled.div`
  flex-grow: 4;
`;

const PlayButton = styled.button`
  border: 0px;
  background-color: transparent;
  color: red;
`;

const ProgressBarDiv = styled.div`
  background-color: #f1ebf5;
  flex-grow: 4;
  margin-left: 10px;
  border-radius: 10px;
`;

const CircleSunDiv = styled.button`
  width: 115px;
  height: 115px;
  background: url("${(props) => props.image_source}");
  background-size: cover;
  border-radius: 5px;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  -o-transition: background 0.3s ease-in-out;
  transition: background 0.3s ease-in-out;
  z-index: 99;
  -webkit-transition: opacity 0.3s ease-in-out;
  -moz-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => props.opacity};

  :hover {
    -webkit-transition: background 0.3s ease-in-out;
    -moz-transition: background 0.3s ease-in-out;
    -o-transition: background 0.3s ease-in-out;
    transition: background 0.3s ease-in-out;
    -webkit-transition: opacity 0.3s ease-in-out;
    -moz-transition: opacity 0.3s ease-in-out;
    transition: opacity 0.3s ease-in-out;

    background-color: transparent;
    transition: background 0.3s ease-in-out;

    background: url("${(props) => props.image_over_source}");
    width: 115px;
    height: 115px;
    background-size: cover;
    border-radius: 5px;
    z-index: 99;
  }
`;

const PlayerTriangleImgFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 115px;
  width: 115px;
`;
const PlayImageDiv = styled.img`
  padding-right: 5px;
`;

const PauseImageDiv = styled.img`
  padding-right: 13px;
`;

const Wrapper = styled.div`
  max-width: 900px;
  min-width: 500px;
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  align-items: center;
`;

export default Player;
