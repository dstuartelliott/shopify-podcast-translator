import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg";

function Top() {
  return (
    <Wrapper>
      <LargerPic>
        <HeroImgLarger image_source={HeroSrc}></HeroImgLarger>
      </LargerPic>
      <HeroDiv>
        <ImageDiv>
          <HeroImgMB image_source={HeroSrc}></HeroImgMB>
        </ImageDiv>
        <TextDiv>The Pre-Launch Strategies of a Million-Dollar Brand</TextDiv>
        <SummaryDiv>
          Making it easier to keep track of daily hydration goals, Emily Chong
          and Nathan Chan started Healthish and created sleek water bottles with
          timestamps. In this episode of Shopify Masters, we chat with Nathan
          and Emily on product development and building their business through
          influencer marketing.
        </SummaryDiv>
      </HeroDiv>
    </Wrapper>
  );
}

const LargerPic = styled.div`
  position: absolute;
  top: 18px;
  right: 48px;
  width: 150px;
  @media (max-width: 600px) {
    display: hidden;
    visibility: hidden;
  }
`;

const HeroImgLarger = styled.div`
  background-image: url("${(props) => props.image_source}");
  min-height: 60px;
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width: 600px) {
    display: hidden;
  }
`;

const HeroDiv = styled.div`
  display: flex;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;

  border-radius: 5px;
  margin: auto;
  font-size: 23px;
  flex-direction: column;
  height: 200px;

  @media (max-width: 600px) {
    font-size: 15px;
    font-weight: 500;
    justify-content: space-between;
    padding: 10px;
    flex-direction: row;
    height: 100px;
    border: 2px solid #eec200;
  }
`;

const ImageDiv = styled.div`
  margin-right: 0px;
  /* background-color: blue; */
  min-width: 50%;
  display: none;
  @media (max-width: 800px) {
    display: block;
  }
`;

const TextDiv = styled.div`
  width: 340px;
  padding-left: 10px;
`;

const SummaryDiv = styled.div`
  display: block;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 15px;
  width: 340px;
  text-align: justify;
  text-align-last: left;
  @media (max-width: 600px) {
    display: none;
  }
`;

const HeroImgMB = styled.div`
  background-image: url("${(props) => props.image_source}");
  min-height: 80px;
  max-width: 120px;
  display: none;
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width: 600px) {
    min-height: 100px;
    max-width: 220px;
    display: block;
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  max-width: 600px;
`;

export default Top;
