import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg";

import { isMobile } from "react-device-detect";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { getPodcastInfosSize } from "./reducers";
import {
  updatePodcastInfoDimensions,
  updatePodcastToggleState,
} from "./actions";
import PodcastInfoExpanded from "./PodcastInfoExpanded";
import PodcastInfoCollapsed from "./PodcastInfoCollapsed";
import {
  IoIosPlayCircle,
  IoIosPause,
  IoMdRewind,
  IoIosFastforward,
} from "react-icons/io";

import useSize from "@react-hook/size";

function PodcastInfo() {
  const dispatch = useDispatch();

  let [topVisible, setTopVisible] = React.useState(false);

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
  let podcast_info_size = useSelector(getPodcastInfosSize);

  React.useEffect(() => {
    dispatch(
      updatePodcastInfoDimensions({ width_collapsed, height_collapsed })
    );
    dispatch(updatePodcastToggleState(!topVisible));
  }, []);

  const PodcastInfoSectionMBCollapsed_target = React.useRef(null);
  const nomarltarget = React.useRef(null);

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
              <CollaposedPlayerButtons>
                <IoMdRewind size={20}></IoMdRewind>
                <IoIosPlayCircle size={30}></IoIosPlayCircle>

                <IoIosFastforward size={20}></IoIosFastforward>
              </CollaposedPlayerButtons>
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
    return <div>mobile</div>;
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

const CollaposedPlayerButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  margin: auto;
  padding: 10px;
`;

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
  margin-top: -25px;

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
