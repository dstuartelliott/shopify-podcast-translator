import React from "react";

import styled, { keyframes } from "styled-components";

import { Icon } from "react-icons-kit";

import { loader } from "react-icons-kit/feather/loader";

function PSRListing({ searchResultItem }) {
  console.log(searchResultItem);

  let filtered_genres = searchResultItem.genres.filter(
    (word) => word !== "Podcasts"
  );

  filtered_genres = filtered_genres.slice(0, 3);

  const [genresArray, setgenresArray] = React.useState(filtered_genres);
  const [podcastToExpand, setpodcastToExpand] = React.useState("");

  function handleClick(event) {
    console.log(event);
  }
  return (
    <Wrapper>
      <BigButton onClick={handleClick}></BigButton>
      <InnerWrapper>
        <PodcastLogo
          image_source={searchResultItem.artworkUrl600}
          alt="Podcast Image"
        ></PodcastLogo>

        <TextBelow>
          <TrackName>{searchResultItem.trackName}</TrackName>
          <ArtistName>{searchResultItem.artistName}</ArtistName>
          <Genres>
            {genresArray.map((element, i) => {
              return <Genre>{element}</Genre>;
            })}
          </Genres>
        </TextBelow>
      </InnerWrapper>
    </Wrapper>
  );
}

const BigButton = styled.button`
  position: absolute;
  width: 250px;
  height: 290px;
  background: transparent;
  border: transparent;
  @media (max-width: 600px) {
    width: 100%;
    height: 500px;
  }
  :hover {
    cursor: pointer;
  }
`;

const PodcastLogo = styled.div`
  width: 250px;
  height: 200px;
  background: url("${(props) => props.image_source}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;

  @media (max-width: 600px) {
    width: 400px;
    height: 400px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const TextBelow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25px;

  @media (max-width: 600px) {
    padding-left: 5px;
  }
`;
const TrackName = styled.div`
  font-weight: 500;
  padding-top: 5px;
  font-size: 13px;
  width: 200px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    width: 300px;
  }
`;
const ArtistName = styled.div`
  font-weight: 500;
  padding-top: 5px;
  font-size: 13px;
  width: 200px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    width: 400px;
  }
  color: #807985;
  padding-top: 5px;
`;
const Country = styled.div``;

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
const ArtWork = styled.div;

const InnerWrapper = styled.div`
  padding: 10px;
  z-index: 6;
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  width: 250px;
  height: 290px;
  box-shadow: 3px 3px 10px #d2cdd5;

  @media (max-width: 600px) {
    width: 100%;
    height: 500px;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
`;

export default PSRListing;
