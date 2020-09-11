import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg";

function Top() {
  return (
    <Wrapper>
      <HeroDiv>
        <ImageDiv>
          <HeroImgMB image_source={HeroSrc}></HeroImgMB>
        </ImageDiv>
        <TextDiv>The Pre-Launch Strategies of a Million-Dollar Brand</TextDiv>
      </HeroDiv>
    </Wrapper>
  );
}
const HeroDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  border: 1px solid black;
  border-radius: 5px;
  margin: auto;
  max-width: 800px;
  font-size: 32px;

  @media (max-width: 860px) {
    border: 2px solid #eec200;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    font-weight: 500;
    justify-content: space-between;
    padding: 10px;
  }
`;

const ImageDiv = styled.div`
  min-width: 50%;
  background-color: transparent;
`;

const TextDiv = styled.div`
  padding-left: 40px;
  @media (max-width: 600px) {
    padding-left: 10px;
  }
`;

const HeroImgMB = styled.div`
  background-image: url("${(props) => props.image_source}");
  min-height: 200px;
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 600px) {
    min-height: 100px;
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
`;

export default Top;
