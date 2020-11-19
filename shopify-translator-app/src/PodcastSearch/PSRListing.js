import React from "react";

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { changePodcastShowing } from "../actions";
import { useDispatch } from "react-redux";

function PSRListing({ searchResultItem }) {
  const dispatch = useDispatch();

  let filtered_genres = searchResultItem.genres.filter(
    (word) => word !== "Podcasts"
  );

  filtered_genres = filtered_genres.slice(0, 3);

  function handleClick(event) {
    console.log(event);
    dispatch(changePodcastShowing(searchResultItem));
  }
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
        </TextBelow>
      </InnerWrapper>
    </Wrapper>
  );
}

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
