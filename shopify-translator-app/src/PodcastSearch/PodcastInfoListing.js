import React from "react";

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { changePodcastShowing } from "../actions";
import { useDispatch } from "react-redux";
import { PlayerContext } from "../Contexts/PlayerContext";

import PodcastEpisodeComponent from "./PodcastEpisodeComponent";

let podcastFeed;
function PodcastInfoListing({ searchResultItem }) {
  console.log(searchResultItem);
  const dispatch = useDispatch();
  const playerContext = React.useContext(PlayerContext);

  let filtered_genres = searchResultItem.genres.filter(
    (word) => word !== "Podcasts"
  );

  filtered_genres = filtered_genres.slice(0, 3);

  const [podcastSummary, setPodcastSummary] = React.useState("");

  const [podcastEpisodes, setPodcastEpisodes] = React.useState([{}]);

  function handleClick(event) {
    console.log(event);
    dispatch(changePodcastShowing(searchResultItem));
  }

  React.useEffect(() => {
    console.info(searchResultItem.feedUrl);
    async function getPodcastEpisodes(feed_url) {
      console.info("episodes starting");

      // eslint-disable-next-line
      let episodes = await playerContext.getPodcastEpisodes(feed_url);

      console.info(episodes.dataAsJson.elements);

      let root_element = episodes.dataAsJson.elements.filter(
        (element) => element.type === "element"
      );
      console.info(root_element[0].elements[0].elements);

      podcastFeed = root_element[0].elements[0].elements;

      let clipped = podcastFeed.slice(0, 50);

      const summary = clipped.find((element) => element.name === "description");
      const episodesArray = clipped.filter(
        (element) => element.name === "item"
      );

      // let option1 = summary.elements[0].text;
      // let option2 = summary.elements[0].cdata;

      // console.info(summary);

      console.info(podcastFeed);
      console.info(episodesArray);
      setPodcastEpisodes(episodesArray);

      // console.info(option1);
      // console.info(option2);

      if (summary.elements[0].text !== undefined) {
        setPodcastSummary(summary.elements[0].text);
      } else {
        setPodcastSummary(summary.elements[0].cdata);
      }
    }
    getPodcastEpisodes(searchResultItem.feedUrl);

    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <MenuItemLink onClick={handleClick} to="/podcast"></MenuItemLink>
      <InnerWrapper>
        <PodcastLogo
          image_source={searchResultItem.artworkUrl600}
          alt="Podcast Image"
        ></PodcastLogo>

        <TextBelow>
          <TrackName>{searchResultItem.trackName}</TrackName>
          <ArtistName>{searchResultItem.artistName}</ArtistName>
          <Genres>
            {filtered_genres.map((element, i) => {
              return <Genre>{element}</Genre>;
            })}
          </Genres>
          <SummaryText>{podcastSummary}</SummaryText>
        </TextBelow>
      </InnerWrapper>
      <Episodes>
        {podcastEpisodes.map((element, i) => {
          return (
            <PodcastEpisodeComponent
              episode={element}
              image={searchResultItem.artworkUrl600}
            />
          );
        })}
      </Episodes>
    </Wrapper>
  );
}

const Episodes = styled.div``;

const SummaryText = styled.div`
  font-size: 12px;
  color: #807985;
  text-align: justify;
  padding-top: 10px;
  padding-right: 10px;
`;
const MenuItemLink = styled(NavLink)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  background-color: transparent;
  position: absolute;
  z-index: 99;

  position: absolute;
  width: 250px;
  height: 290px;
`;

const PodcastLogo = styled.div`
  width: 250px;
  height: 200px;
  background: url("${(props) => props.image_source}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const TextBelow = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 10;
  @media (max-width: 600px) {
    padding-left: 5px;
  }
`;
const TrackName = styled.div`
  font-weight: 500;
  padding-top: 5px;
  font-size: 24px;

  @media (max-width: 600px) {
  }
`;
const ArtistName = styled.div`
  font-weight: 500;
  padding-top: 5px;
  font-size: 13px;

  @media (max-width: 600px) {
    width: 400px;
  }
  color: #807985;
  padding-top: 5px;
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  width: 200px;
  color: #807985;
  padding-top: 5px;
`;

const Genre = styled.div`
  padding-right: 10px;
`;

const InnerWrapper = styled.div`
  padding: 10px;
  z-index: 6;
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #d2cdd5;
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    width: 100%;
    height: 500px;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  overflow-y: scroll;
  bottom: 10px;
  position: absolute;
  top: 300px;
  width: 900px;
`;

export default PodcastInfoListing;
