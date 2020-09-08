import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg"; // Tell webpack this JS file uses this image
function PodcastInfo() {
  return (
    <PodcastInfoWrapper>
      <PodcastImageTitle>
        <HeroImg image_source={HeroSrc}></HeroImg>
        <PodcastTitle>
          <displayXlarge>
            The Pre-Launch Strategies of a Million-Dollar Brand
          </displayXlarge>
        </PodcastTitle>
      </PodcastImageTitle>
      <PodcastText>
        Making it easier to keep track of daily hydration goals, Emily Chong and
        Nathan Chan started Healthish and created sleek water bottles with
        timestamps. In this episode of Shopify Masters, we chat with Nathan and
        Emily on product development and building their business through
        influencer marketing.
      </PodcastText>
    </PodcastInfoWrapper>
  );
}

const PodcastText = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const HeroImg = styled.div`
  background-image: url("${(props) => props.image_source}");
  height: 100px;
  width: 250px;
  background-position: middle;
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
`;

const PodcastInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 780px;
  min-width: 650px;

  background-color: white;
  margin-left: 140px;
  padding: 10px;
  border: 2px solid #eec200;
  border-radius: 6px;
  margin-top: 10px;
`;

export default PodcastInfo;
