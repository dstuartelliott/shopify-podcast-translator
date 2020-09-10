import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg";

import { isMobile } from "react-device-detect";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useDispatch } from "react-redux";

import {
  updatePodcastInfoDimensions,
  updatePodcastToggleState,
  // jumpToTime,
  // markEnglishAsPlaying,
  // recordMP3PlayerState,
  // addCurrentTime,
} from "./actions";
// import {
//   IoIosPlayCircle,
//   IoIosPause,
//   IoMdRewind,
//   IoIosFastforward,
// } from "react-icons/io";

import useSize from "@react-hook/size";

function PodcastInfo() {
  const dispatch = useDispatch();

  // let current_time = useSelector(getCurrentTime);
  // let [playState, setPlayState] = React.useState("paused");
  // let mp3PlayState = useSelector(getMP3PlayerState);

  let [topVisible, setTopVisible] = React.useState(false);

  // TODO Add back in when contols finished

  // function handlePlayClickButton(event) {
  //   console.log(current_time);
  //   if (playState === "paused") {
  //     if (current_time === undefined) {
  //       dispatch(jumpToTime(-200.0));
  //       // dispatch(markEnglishAsPlaying(0.0, "TBD"));

  //       // dispatch(recordMP3PlayerState("playing"));
  //     } else {
  //       dispatch(jumpToTime(current_time));
  //     }
  //     setPlayState("playing");
  //   } else if (playState === "playing") {
  //     console.log("=-=======pausing");
  //     if (mp3PlayState === "playing") {
  //       console.log(" handlePlayPauseEnglish pausing");
  //       dispatch(jumpToTime(-99.99));
  //     } else if (mp3PlayState === "paused") {
  //       dispatch(jumpToTime(current_time));
  //     }
  //     setPlayState("paused");
  //   }
  // }

  // function jumpFwd(event) {
  //   if (current_time !== undefined) {
  //     dispatch(jumpToTime(current_time + 15.0));
  //   }
  // }

  // function jumpBack(event) {
  //   if (current_time !== undefined) {
  //     dispatch(jumpToTime(current_time - 15.0));
  //   }
  // }

  function hideTopToggleClick(event) {
    if (topVisible === true) {
      setTopVisible(false);
      dispatch(updatePodcastToggleState(true));
    } else if (topVisible === false) {
      setTopVisible(true);
      dispatch(updatePodcastToggleState(false));
    }
    dispatch(
      updatePodcastInfoDimensions({ width_collapsed, height_collapsed })
    );

    //dispatch(updatePodcastInfoDimensions({ width, height }));
  }

  React.useEffect(() => {
    dispatch(
      updatePodcastInfoDimensions({ width_collapsed, height_collapsed })
    );
    dispatch(updatePodcastToggleState(!topVisible));
    // eslint-disable-next-line
  }, []);

  const PodcastInfoSectionMBCollapsed_target = React.useRef(null);

  const Desktop_target = React.useRef(null);

  let [width_collapsed, height_collapsed] = useSize(
    PodcastInfoSectionMBCollapsed_target
  );

  if (isMobile && topVisible === false) {
    console.log([width_collapsed, height_collapsed]);

    return (
      <WrapperCollapased ref={PodcastInfoSectionMBCollapsed_target}>
        <PodcastInfoSectionMBCollapsed>
          <HeroImgMB image_source={HeroSrc}></HeroImgMB>
          <TextAndButtonCollapsed>
            <PodcastTitleMBCollapsed>
              The Pre-Launch Strategies of a Million-Dollar Brand
            </PodcastTitleMBCollapsed>
            <ShowHideCollapsed>
              {/* <CollaposedPlayerButtons>
                <PlayButton onClick={jumpBack}>
                  <IoMdRewind size={20}></IoMdRewind>
                </PlayButton>
                <PlayButton onClick={handlePlayClickButton}>
                  {playState === "playing" ? (
                    <IoIosPause size={20}></IoIosPause>
                  ) : (
                    <IoIosPlayCircle size={30}></IoIosPlayCircle>
                  )}
                </PlayButton>

                <PlayButton onClick={jumpFwd}>
                  <IoIosFastforward size={20}></IoIosFastforward>
                </PlayButton>
              </CollaposedPlayerButtons> */}

              <ShowHideButtonCollapsed onClick={hideTopToggleClick}>
                <MdExpandMore size={30}></MdExpandMore>
              </ShowHideButtonCollapsed>
            </ShowHideCollapsed>
          </TextAndButtonCollapsed>
        </PodcastInfoSectionMBCollapsed>
      </WrapperCollapased>
    );
  }

  if (isMobile && topVisible) {
    return (
      <Wrapper>
        <PodcastInfoSectionMB>
          <PodcastImageTitleMB>
            <HeroImgMB image_source={HeroSrc}></HeroImgMB>
            <PodcastTitleMB>
              The Pre-Launch Strategies of a Million-Dollar Brand
            </PodcastTitleMB>
          </PodcastImageTitleMB>
          <PodcastTextMB>
            Making it easier to keep track of daily hydration goals, Emily Chong
            and Nathan Chan started Healthish and created sleek water bottles
            with timestamps. In this episode of Shopify Masters, we chat with
            Nathan and Emily on product development and building their business
            through influencer marketing.
          </PodcastTextMB>
          <ShowHideExpanded>
            <ShowHideButton onClick={hideTopToggleClick}>
              <MdExpandLess size={30}></MdExpandLess>
            </ShowHideButton>
          </ShowHideExpanded>
        </PodcastInfoSectionMB>
      </Wrapper>
    );
  }

  if (isMobile === false) {
    return (
      <PodcastInfoWrapper ref={Desktop_target}>
        <PodcastImageTitle>
          <HeroImg image_source={HeroSrc}></HeroImg>
          <PodcastTitle>
            The Pre-Launch Strategies of a Million-Dollar Brand
          </PodcastTitle>
        </PodcastImageTitle>
        <PodcastText>
          Making it easier to keep track of daily hydration goals, Emily Chong
          and Nathan Chan started Healthish and created sleek water bottles with
          timestamps. In this episode of Shopify Masters, we chat with Nathan
          and Emily on product development and building their business through
          influencer marketing.
        </PodcastText>
      </PodcastInfoWrapper>
    );
  }
}

// const PlayButton = styled.button`
//   cursor: pointer;
//   width: 50px;
//   height: 40px;
//   overflow: hidden;
//   z-index: 200;
//   border-color: transparent;
//   background-color: transparent;
//   /* border: 1px dashed #f49342; */
//   :focus {
//     outline: none;
//   }
//   align-self: center;
// `;

// const CollaposedPlayerButtons = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   width: 130px;
//   margin: auto;
//   padding-left: 10px;
//   padding-top: 10px;
// `;

const ShowHideCollapsed = styled.div`
  width: 100%;
  height: 1px;
  text-align: right;
  background-color: transparent;
  color: #454f5b;
`;

const ShowHideExpanded = styled.div`
  text-align: right;
  background-color: transparent;
`;

const ShowHideButtonCollapsed = styled.button`
  margin-top: 25px;

  cursor: pointer;
  width: 40px;
  height: 40px;
  overflow: hidden;
  z-index: 200;
  border-color: transparent;
  background-color: transparent;
  border-radius: 40px;
  color: #eec200;
  /* border: 1px dashed #f49342; */
  :focus {
    outline: none;
  }
`;

const ShowHideButton = styled.button`
  margin-top: -80px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  overflow: hidden;
  z-index: 200;
  border-color: transparent;
  background-color: transparent;
  border-radius: 40px;
  color: #eec200;
  /* border: 1px dashed #f49342; */
  :focus {
    outline: none;
  }
  align-self: center;
`;

// Collapsed Mobile

const PodcastTitleMBCollapsed = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: 400;
  padding-left: 5px;
`;

const TextAndButtonCollapsed = styled.div`
  display: flex;
  flex-direction: column;
`;

const PodcastInfoSectionMBCollapsed = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 95%;
  background-color: transparent;
  padding: 2px;
  border: 2px solid #eec200;
  border-radius: 6px;
  margin: auto;
`;

const WrapperCollapased = styled.div``;

//Mobile
const Wrapper = styled.div``;

const PodcastInfoSectionMB = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 80%;
  background-color: transparent;
  padding: 10px;
  border: 2px solid #eec200;
  border-radius: 6px;
  margin: auto;
`;

const PodcastImageTitleMB = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroImgMB = styled.div`
  background-image: url("${(props) => props.image_source}");
  height: 100px;
  width: 250px;
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
`;

const PodcastTitleMB = styled.div`
  text-align: left;
  padding-top: 10px;
  font-size: 27px;
  line-height: 36px;
  font-weight: 500;
`;

const PodcastTextMB = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

// Desktop

const PodcastText = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  }
`;

const HeroImg = styled.div`
  background-image: url("${(props) => props.image_source}");
  height: 100px;
  width: 250px;
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
`;

const PodcastImageTitle = styled.div`
  display: flex;
  min-width: 700px;
`;

const PodcastTitle = styled.div`
  text-align: left;
  padding: 20px;
  font-size: 27px;
  line-height: 36px;
  font-weight: 500;
`;

const PodcastInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 780px;
  min-width: 650px;
  background-color: transparent;
  margin-left: 140px;
  padding: 10px;
  border: 2px solid #eec200;
  border-radius: 6px;
  margin-top: 10px;
`;
export default PodcastInfo;
