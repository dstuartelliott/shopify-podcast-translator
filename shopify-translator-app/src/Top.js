import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg";
import { COLORS_SHOPIFY_YELLOW_PALLETE } from "./constants.js";
function Top() {
  return (
    <Wrapper>
      <HeroDiv>
        <ImageDiv>
          <HeroImgMB image_source={HeroSrc}></HeroImgMB>
        </ImageDiv>
        <SummaryDiv>
          <TitleText>
            The Pre-Launch Strategies of a Million-Dollar Brand
          </TitleText>

          <SummaryText>
            Making it easier to keep track of daily hydration goals, Emily Chong
            and Nathan Chan started Healthish and created sleek water bottles
            with timestamps. In this episode of Shopify Masters, we chat with
            Nathan and Emily on product development and building their business
            through influencer marketing.
          </SummaryText>
        </SummaryDiv>
      </HeroDiv>
    </Wrapper>
  );
}

const SummaryText = styled.div`
  font-size: 13px;
  font-weight: 300;
  padding-top: 10px;
  text-align: justify;
  text-align-last: left;

  @media (max-width: 600px) {
    display: none;
  }
`;

const HeroDiv = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 500;
  justify-content: flex-start;
  padding: 10px;
  flex-direction: row;
  border: 2px solid ${COLORS_SHOPIFY_YELLOW_PALLETE.Yellow};

  /* padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;

  border-radius: 5px;
  margin: auto;
  font-size: 23px;
  flex-direction: column;
  height: 200px; */
  align-content: flex-start;

  @media (max-width: 600px) {
    font-size: 15px;
    font-weight: 500;
    justify-content: flex-start;
    padding: 10px;
    flex-direction: row;
    height: 100px;
    border: 2px solid #eec200;
  }
`;

const ImageDiv = styled.div`
  margin-right: 0px;
  /* background-color: blue; */
  min-width: 150px;
`;

const SummaryDiv = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  font-size: 15px;
  max-width: 700px;
  flex-grow: 2;

  @media (min-width: 600px) {
  }
`;

const TitleText = styled.div`
  width: 200px;

  @media (min-width: 600px) {
    /* background-color: red; */
    align-self: flex-start;
    max-width: 280px;
  }
`;

const HeroImgMB = styled.div`
  background-image: url("${(props) => props.image_source}");
  min-height: 70px;
  max-width: 220px;
  display: block;
  background-position: left 10px top 5px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  padding: 10px;
  max-width: 900px;
`;

export default Top;
