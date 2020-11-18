import React from "react";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changePodcastSelectedToPlay } from "../actions";

function PodcastEpisodeComponents({ episode, image }) {
  const dispatch = useDispatch();

  function handleClick(event) {
    let description;
    let date = episode.elements[2].elements[0].text;

    let just_date = date.split(":")[0];
    just_date = just_date.slice(0, just_date.length - 2);
    if (episode.elements[1].elements[0].cdata !== undefined) {
      description = episode.elements[1].elements[0].cdata;
    }

    if (episode.elements[1].elements[0].text !== undefined) {
      description = episode.elements[1].elements[0].text;
    }

    if (episode.elements[1].elements[0].text !== undefined) {
      description = episode.elements[1].elements[0].text;
    }

    let title = episode.elements[0].elements[0].text;
    let url = episode.elements[13].attributes.url;

    dispatch(changePodcastSelectedToPlay({ title, description, url, image }));
    console.log(episode);

    console.log(episode.elements[13].attributes.url);
    console.log(episode.elements[13].attributes.url);
  }
  if (episode.elements !== undefined) {
    let description;
    console.log(episode.elements);

    let date_array_element = episode.elements.filter(
      (element) => element.name === "pubDate"
    );
    let date = "";
    if (date_array_element[0].elements[0] !== undefined) {
      date = date_array_element[0].elements[0].text;
    }

    let just_date;
    if (date.includes(":")) {
      just_date = date.split(":")[0];
      just_date = just_date.slice(0, just_date.length - 2);
    } else {
      just_date = date;
    }
    if (episode.elements[1].elements[0].cdata !== undefined) {
      description = episode.elements[1].elements[0].cdata;
    }

    if (episode.elements[1].elements[0].text !== undefined) {
      description = episode.elements[1].elements[0].text;
    }

    if (episode.elements[1].elements[0].text !== undefined) {
      description = episode.elements[1].elements[0].text;
    }

    let regex = /(<([^>]+)>)/gi,
      body = description,
      result = body.replace(regex, "");

    return (
      <Wrapper>
        <Episode>
          <TitleAndDate>
            <Title>{episode.elements[0].elements[0].text}</Title>
            <Date> {just_date}</Date>
          </TitleAndDate>
          <Description>{result}</Description>
          <PlayButton onClick={handleClick}>Play</PlayButton>
        </Episode>
      </Wrapper>
    );
  } else {
    return <Wrapper></Wrapper>;
  }
  //   let title = episode.episode.elements[0].elements[0].text;
}

const TitleAndDate = styled.div`
  display: flex;
  flex-direction: row;
`;

const PlayButton = styled.button``;

const Episode = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #d2cdd5;
  padding: 30px;
`;

const Title = styled.div`
  font-weight: 500;
  padding-top: 5px;
  font-size: 24px;
  flex-grow: 4;
`;

const Date = styled.div`
  padding-top: 5px;
  font-size: 12px;
  width: 200px;
  color: #807985;
  align-self: flex-end;
  text-align: right;
`;

const Description = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;

export default PodcastEpisodeComponents;
