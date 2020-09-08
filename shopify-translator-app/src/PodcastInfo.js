import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg";

import { isMobile } from "react-device-detect";

function PodcastInfo() {
  // fake mobile
  if (isMobile) {
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
        </PodcastInfoSectionMB>
      </Wrapper>
    );
  } else
    return (
      <PodcastInfoSection>
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
      </PodcastInfoSection>
    );
}

//Mobile
const Wrapper = styled.div`
  padding-top: 20px;
`;

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
  background-position: left;
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

  @media (max-width: 800px) {
    font-size: 27px;
    line-height: 36px;
    font-weight: 500;
  }
`;

const PodcastInfoSection = styled.div`
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
