import React from "react";
import styled from "styled-components/macro";
import { COLORS_SHOPIFY_GREYS_PALLETE } from "../constants.js";

import { useSelector } from "react-redux";
import { getLCSentencesForSearch } from "../reducers";
import {
  updateSearchResults,
  updateShouldTranslationsAutoPlay,
} from "../actions";
import { useDispatch } from "react-redux";
import { DatabaseContext } from "../DatabaseContext.js";
import PSRListing from "./PSRListing.js";

let filtered_sentences = [];

function PodcastListingSearch() {
  const dispatch = useDispatch();
  const dataBaseContext = React.useContext(DatabaseContext);

  const [textfieldValue, setTextField] = React.useState("...search here!");

  const [searchResults, setSearchResults] = React.useState([]);

  let simplifiedSentences = useSelector(getLCSentencesForSearch);

  function handleClick(event) {
    if (textfieldValue === "...search here!") {
      setTextField("");
    }
  }

  React.useEffect(() => {
    sendSearchToItunes("shopify");
  }, []);

  async function sendSearchToItunes(term) {
    // eslint-disable-next-line
    let search_results = await dataBaseContext.getItunesSearchResult(term);
    console.log(search_results.json.results);
    setSearchResults(search_results.json.results);
  }

  function handleKeyPress(event) {
    // console.log(event.target.value);

    if (event.key === "Enter") {
      console.log("enter press here! ");
      console.log(event.target.value);
      sendSearchToItunes(event.target.value);
    }

    // console.log(computed_transcript)
  }
  function findSentence(event) {
    setTextField(event.target.value);
  }

  return (
    <Wrapper>
      <SearchDiv>
        <TranscriptSearch
          type="text"
          value={textfieldValue}
          onChange={findSentence}
          onKeyDown={handleKeyPress}
        ></TranscriptSearch>
      </SearchDiv>
      <SearchResults>
        {searchResults.map((element, i) => {
          return (
            <PSRListing
              searchResultItem={element}
              key={element.uuid}
            ></PSRListing>
          );
        })}
      </SearchResults>
    </Wrapper>
  );
}

const SearchResults = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: center;
    flex-wrap: no-wrap;
  }
`;

const SearchDiv = styled.div`
  flex-grow: 2;
  background-color: ${COLORS_SHOPIFY_GREYS_PALLETE.Lighter};
  border-bottom: 1px solid ${COLORS_SHOPIFY_GREYS_PALLETE.Sky};
  border-radius: 15px;
  box-shadow: 3px 3px 5px #aea8b2;
  padding-right: 16px;
`;

const TranscriptSearch = styled.input`
  width: auto;
  border-color: transparent;
  background-color: transparent;
  padding-left: 20px;
  /* @media (max-width: 600px) {
    width: 90%;
    font-size: 16px;
    height: 25px;
  }  */
`;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;

  @media (max-width: 600px) {
    padding-top: 23px;
  }
`;

export default PodcastListingSearch;
