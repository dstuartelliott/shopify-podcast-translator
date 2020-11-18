import React from "react";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changePodcastSelectedToPlay } from "../actions";

function PodcastEpisodeComponents({ episode, image }) {
  let description = "";
  let title = "";
  let date = "";
  let url = "";
  const dispatch = useDispatch();

  function handleClick(event) {
    dispatch(changePodcastSelectedToPlay({ title, description, url, image }));
    // console.log(episode);

    // console.log(episode.elements[13].attributes.url);
    // console.log(episode.elements[13].attributes.url);
  }
  if (episode.elements !== undefined) {
    // console.log(episode.elements);

    let url_array_element = episode.elements.filter(
      (element) => element.name === "enclosure"
    );

    let date_array_element = episode.elements.filter(
      (element) => element.name === "pubDate"
    );

    let description_element = episode.elements.filter(
      (element) => element.name === "description"
    );

    let title_element = episode.elements.filter(
      (element) => element.name === "title"
    );

    url = url_array_element[0].attributes.url;

    // console.info(title_element);

    if (date_array_element[0].elements[0] !== undefined) {
      date = date_array_element[0].elements[0].text;
    }

    if (title_element[0].elements[0] !== undefined) {
      title = title_element[0].elements[0].text;
    }
    // console.info(title);

    let focused_date_element = description_element[0].elements[0];

    let just_date;
    if (date.includes(":")) {
      just_date = date.split(":")[0];
      just_date = just_date.slice(0, just_date.length - 2);
    } else {
      just_date = date;
    }
    if (focused_date_element.cdata !== undefined) {
      description = focused_date_element.cdata;
    }

    if (focused_date_element.text !== undefined) {
      description = focused_date_element.text;
    }

    let regex = /(<([^>]+)>)/gi,
      body = description,
      result = body.replace(regex, "");

    description = result;
    return (
      <Wrapper>
        <Episode>
          <TitleAndDate>
            <Title>{title}</Title>
            <Date> {just_date}</Date>
          </TitleAndDate>
          <Description>{description}</Description>
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
