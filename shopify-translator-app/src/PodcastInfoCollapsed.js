import React from "react";
import styled from "styled-components";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import HeroSrc from "./images/shopify_masters_hero.jpg";

function PodcastInfoCollapsed(passedSize) {
  const PodcastInfoSectionMBCollapsed_target = React.useRef(null);

  React.useEffect(() => {
    console.log(passedSize);
  });

  return (
    <WrapperCollapased ref={PodcastInfoSectionMBCollapsed_target}>
      {/* <PodcastInfoSectionMBCollapsed>
        <HeroImgMB image_source={HeroSrc}></HeroImgMB>
        <TextAndButtonCollapsed>
          <PodcastTitleMBCollapsed>
            The Pre-Launch Strategies of a Million-Dollar Brand
          </PodcastTitleMBCollapsed>
          <ShowHideCollapsed>
            <ShowHideButtonCollapsed onClick={hideTopToggleClick}>
              <MdExpandMore size={30}></MdExpandMore>
            </ShowHideButtonCollapsed>
          </ShowHideCollapsed>
        </TextAndButtonCollapsed>
      </PodcastInfoSectionMBCollapsed> */}
    </WrapperCollapased>
  );
  // }
}

const HeroImgMB = styled.div`
  background-image: url("${(props) => props.image_source}");
  height: 100px;
  width: 250px;
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ShowHideButtonCollapsed = styled.button`
  margin-top: 10px;

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

const ShowHideCollapsed = styled.div`
  width: 100%;
  height: 1px;
  text-align: right;
  background-color: transparent;
`;

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

const WrapperCollapased = styled.div`
  padding-top: 20px;
`;

export default PodcastInfoCollapsed;
