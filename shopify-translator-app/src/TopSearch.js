import React from "react";
import styled from "styled-components/macro";
import { COLORS_SHOPIFY_GREYS_PALLETE } from "./constants.js";

import { useSelector } from "react-redux";
import { getLCSentencesForSearch } from "./reducers";
import {
  updateSearchResults,
  updateShouldTranslationsAutoPlay,
} from "./actions";
import { useDispatch } from "react-redux";

let filtered_sentences = [];

function TopSearch() {
  const dispatch = useDispatch();

  const [textfieldValue, setTextField] = React.useState("...search here!");
  let simplifiedSentences = useSelector(getLCSentencesForSearch);

  function handleClick(event) {
    if (textfieldValue === "...search here!") {
      setTextField("");
    }
  }
  function findSentence(event) {
    filtered_sentences = [];
    dispatch(updateShouldTranslationsAutoPlay(false));

    let sentenceSearchText = event.target.value.toLowerCase();
    let original_search_phrase = event.target.value;

    simplifiedSentences.forEach((sentence) => {
      if (
        sentence.english_sentence.includes(sentenceSearchText) ||
        sentence.translated_sentence.includes(sentenceSearchText)
      ) {
        filtered_sentences.push(sentence.uuid);
      }
    });

    if (sentenceSearchText === "") {
      dispatch(updateSearchResults([]));
    } else {
      dispatch(
        updateSearchResults({
          filtered_sentences,
          sentenceSearchText,
          original_search_phrase,
        })
      );
    }
    setTextField(event.target.value);
  }

  return (
    <Wrapper>
      {/* <FlagsDiv>
        <span>Flags </span>
      </FlagsDiv> */}
      <SearchDiv>
        <TranscriptSearch
          type="text"
          value={textfieldValue}
          onChange={findSentence}
          // onKeyDown={handleKeyPress}
          onClick={handleClick}
          style={{ outline: "none" }}
        ></TranscriptSearch>
      </SearchDiv>
    </Wrapper>
  );
}

const FlagsDiv = styled.div`
  width: 100px;
  font-size: 25px;
  align-self: center;
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
  width: 500px;
  border-color: transparent;
  background-color: transparent;
  padding-left: 20px;
  padding-right: 0px;
  &:focus {
    outline: 0;
    border: none;
  }

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
  padding-bottom: 30px;
  height: 30px;

  @media (max-width: 600px) {
    padding-top: 23px;
  }
`;

export default TopSearch;
