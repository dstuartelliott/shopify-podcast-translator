import React from "react";
import styled from "styled-components/macro";
import { Spring } from "react-spring/renderprops";
import CircleSunComponent from "./CircleSunComponent";
import PauseSVGComponent from "./PauseSVGComponent";
import PlaySVGComponent from "./PlaySVGComponent";

import { useSelector, useDispatch } from "react-redux";
import Doughnut from "./Doughnut";
import Draggable from "react-draggable";
import {
  getMP3PlayerState,
  getTimeToJumpTo,
  getUUIDsandTimes,
  getTranslationPlaying,
  // getShowTranslation,
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
// eslint-disable-next-line
let current_uuid;
let isloaded = false;
let areaOfScrollBar;
let dragging = false;
//test
function secondsToTime(e) {
  let h = Math.floor(e / 3600)
    .toString()
    .padStart(2, "0");
  let m = Math.floor((e % 3600) / 60);

  if (h !== "00") {
    m = m.toString().padStart(2, "0");
  } else {
    m = m.toString();
  }

  let s = Math.floor(e % 60)
    .toString()
    .padStart(2, "0");
  if (h !== "00") {
    return h + ":" + m + ":" + s;
  } else {
    return m + ":" + s;
  }
}

function Player() {
  let mp3PlayerState = useSelector(getMP3PlayerState);
  const dispatch = useDispatch();
  const [resizeListenerProgressBar, sizes] = useResizeAware();

  const circleRef = React.useRef(null);

  let timeToJumpTo = useSelector(getTimeToJumpTo);

  let translationPlaying = useSelector(getTranslationPlaying);

  let seeking = false;

  let uuids_and_times = useSelector(getUUIDsandTimes);

  // let showTranslation = useSelector(getShowTranslation);
  let audioref = React.useRef(null);

  let [ProgressBarFillerWidth, setProgressBarFillerWidth] = React.useState(
    `1%`
  );
  let [audioCirclePosition, setAudioCirclePosition] = React.useState({
    x: 0,
    y: 0,
  });

  let [dragPercentage, setDragPercentage] = React.useState("1, 99");

  let [showProgressWheel, setshowProgressWheel] = React.useState(false);
  let [dragMinutesPlayHead, setdragMinutesPlayHead] = React.useState("");

  let [totalTime, setTotalTime] = React.useState("");
  let [playingTime, setplayingTime] = React.useState("0:00");

  const [circleToggle, setcircleToggle] = React.useState(false);

  sizeOfJogArea = sizes.width - 115 - 10;

  areaOfScrollBar = sizeOfJogArea - 30;

  React.useEffect(() => {
    // eslint-disable-next-line
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
      dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PAUSED));
      dispatch(
        recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
      );
    }
  }

  function quickishFindUUID(current_time) {
    // console.log(uuids_and_times);
    if (uuids_and_times !== undefined) {
      let uuid = uuids_and_times.find(
        (element) => current_time > element.start && current_time < element.end
      );

      if (uuid !== undefined) {
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
      let percentage =
        event.nativeEvent.target.currentTime /
        event.nativeEvent.target.duration;

      if (dragging === false) {
        let circle_x = percentage * (sizeOfJogArea - 30);
        setAudioCirclePosition({ x: circle_x, y: 0 });
        console.log(areaOfScrollBar);
        console.log(circle_x);
        setProgressBarFillerWidth(circle_x + 10 + "px");
      }

      setplayingTime(secondsToTime(audioref.current.currentTime));

      if (seeking === false) {
        let current_time = audioref.current.currentTime;

        dispatch(addCurrentTime({ current_time }));
        quickishFindUUID(current_time);
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

      setTotalTime(secondsToTime(audioref.current.duration));
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

    setAudioCirclePosition({ x: data.lastX, y: 0 });

    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );

    console.log(audioref.current.duration * percentage);
    dispatch(jumpToTime(audioref.current.duration * percentage));
    dragging = false;
  }
  function handleDrag(event, data) {
    let percentage = (data.lastX / areaOfScrollBar) * 100;
    let remaining = 100 - percentage;

    setDragPercentage(percentage + " ," + remaining);

    dragging = true;

    let duration = audioref.current.duration * (data.lastX / areaOfScrollBar);
    console.log(secondsToTime(duration));

    // var hrs = ~~(duration / 3600);
    // var mins = ~~((duration % 3600) / 60);
    // var secs = ~~duration % 60;

    // console.log(mins, +":" + secs);
    setdragMinutesPlayHead(secondsToTime(duration));
  }

  function handleInvisibleProgressButtonClicl(event) {
    let left_start =
      event.clientX -
      (event.currentTarget.offsetParent.offsetLeft +
        event.currentTarget.offsetLeft);

    let percentage = left_start / sizeOfJogArea;

    let remaining = 100 - percentage * 100;

    let circle_x = percentage * (sizeOfJogArea - 30);

    setDragPercentage(percentage * 100 + " ," + remaining);

    setAudioCirclePosition({ x: circle_x, y: 0 });

    setProgressBarFillerWidth(circle_x + 10 + "px");

    dispatch(recordMP3PlayerState(MP3_PLAYER_STATES.PLAYING));
    dispatch(
      recordTranslationMP3PlayerState(TRANSLATION_MP3_PLAYER_STATES.PAUSED)
    );
    dispatch(jumpToTime(audioref.current.duration * percentage));

    dragging = false;
  }
  function handleOutBar() {
    setshowProgressWheel(false);
  }

  return (
    <Wrapper onMouseEnter={handleOutBar}>
      <CircleSunButton
        onClick={playButtonHit}
        onMouseEnter={() => setcircleToggle(!circleToggle)}
        onMouseLeave={() => setcircleToggle(!circleToggle)}
      ></CircleSunButton>
      <CircleSunDiv opacity={showProgressWheel ? 0 : 100}>
        <Spring
          config={{ tension: 170, friction: 20, precision: 0.01, velocity: 0 }}
          from={{
            top: circleToggle ? "#F1EBF5" : "#FFDECC",
            bottom: circleToggle ? "#fddf00" : "#FFE600",
            gradient_bottom_x: circleToggle ? 300 : 30,
            stroke: circleToggle ? "#8a8a8a" : "#0d6da8",
          }}
          to={{
            top: circleToggle ? "#FFDECC" : "#F1EBF5",
            bottom: circleToggle ? "#FFE600" : "#fddf00",
            gradient_bottom_x: circleToggle ? 30 : 300,
            stroke: circleToggle ? "#0d6da8" : "#8a8a8a",
          }}
        >
          {(props) => (
            <div>
              <PlayerTriangleImgFlex>
                {mp3PlayerState === MP3_PLAYER_STATES.PLAYING ? (
                  <PauseImageDiv>
                    <PauseSVGComponent
                      height={24}
                      width={30}
                      stroke={props.stroke}
                      strokeWidth={"3"}
                    ></PauseSVGComponent>
                  </PauseImageDiv>
                ) : (
                  <PlayImageDiv>
                    <PlaySVGComponent
                      height={28}
                      width={30}
                      stroke={props.stroke}
                    ></PlaySVGComponent>
                  </PlayImageDiv>
                )}
              </PlayerTriangleImgFlex>

              <CircleSunComponent
                // alt="Circle Background behind play button"
                // opacity={showProgressWheel ? 0 : 100}
                bottom={props.bottom}
                top={props.top}
                gradient_bottom_x={props.gradient_bottom_x}
                width={110}
                height={110}
              ></CircleSunComponent>
            </div>
          )}
        </Spring>
      </CircleSunDiv>
      <DoughnutDiv>
        <Doughnut
          doughnutValues={dragPercentage}
          minutesDrag={dragMinutesPlayHead}
          totalTime={totalTime}
          dragging={dragging}
          playingTime={playingTime}
          width={"120px"}
          height={"120px"}
          fontSizeUpper={"24px"}
        ></Doughnut>
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
              onLoadedData={ableToPlay}
              onLoadStart={loadingStarted}
            ></AudioDivBelow>
          </PlayerDiv>
          <InvisibleProgressButton
            sizeLength={sizeOfJogArea + "px"}
            onClick={handleInvisibleProgressButtonClicl}
            onMouseEnter={() => setshowProgressWheel(true)}
            onMouseLeave={() => setshowProgressWheel(false)}
          ></InvisibleProgressButton>
          <ProgressBar>
            <ProgressBarFiller ProgressBarFillerWidth={ProgressBarFillerWidth}>
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
                    onMouseEnter={() => setshowProgressWheel(true)}
                    onMouseLeave={() => setshowProgressWheel(false)}
                  ></ProgressBarCircle>
                </div>
              </Draggable>
            </ProgressBarFiller>
          </ProgressBar>
        </PlayerWrapper>
      </ProgressBarDiv>
    </Wrapper>
  );
}

const DoughnutDiv = styled.div`
  position: absolute;
  left: -10px;
`;

const InvisibleProgressButton = styled.button`
  position: absolute;
  width: ${(props) => props.sizeLength};
  border: transparent;
  height: 30px;
  background-color: transparent;
  :hover {
    background-color: transparent;
    cursor: pointer;
  }
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

  width: ${(props) => props.ProgressBarFillerWidth};

  /* width: 10%; */
`;

const ProgressBarCircle = styled.button`
  background-color: white;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -8px;
  z-index: 6;
  border: 1px solid #ededed;
  border-radius: 30px;
  -webkit-transition: border 0.3s ease-in-out;
  -moz-transition: border 0.3s ease-in-out;
  -o-transition: border 0.3s ease-in-out;
  transition: border 0.3s ease-in-out;
  box-shadow: 0px 4px 8px rgba(28, 37, 44, 0.08);

  :hover {
    background-color: white;
    cursor: pointer;
  }

  /* width: 10%; */
`;

const AudioDivBelow = styled.audio``;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5px;
`;

const PlayerDiv = styled.div`
  flex-grow: 4;
`;

const ProgressBarDiv = styled.div`
  background-color: #f1ebf5;
  flex-grow: 4;
  margin-left: 10px;
  border-radius: 10px;
`;
const CircleSunDiv = styled.div`
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => props.opacity};
  z-index: 2;
`;

const CircleSunButton = styled.button`
  width: 115px;
  height: 115px;
  background-color: transparent;
  border-radius: 5px;
  z-index: 99;
  position: absolute;
  border: transparent;

  :hover {
    background-color: transparent;
    cursor: pointer;
  }
`;

const PlayerTriangleImgFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 115px;
  width: 115px;
  position: absolute;
  z-index: 3;
  transition: opacity 0.3s ease-in-out;

  opacity: ${(props) => props.opacity};
`;
const PlayImageDiv = styled.div`
  align-self: center;
`;

const PauseImageDiv = styled.div`
  padding-right: 5px;
  align-self: center;
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
