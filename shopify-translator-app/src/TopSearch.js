import React from "react";
import styled from "styled-components";
import { COLORS_SHOPIFY_GREYS_PALLETE } from "./constants.js";

import { useSelector } from "react-redux";
import { getLCSentencesForSearch } from "./reducers";
import { updateSearchResults } from "./actions";
import { useDispatch } from "react-redux";

let filtered_sentences = [];

function TopSearch() {
  const dispatch = useDispatch();

  const [textfieldValue, setTextField] = React.useState("...");
  let simplifiedSentences = useSelector(getLCSentencesForSearch);

  // function handleKeyPress(event) {
  // console.log(event.key);
  // switch (event.key) {
  //   case "Enter": {
  //   }
  //   case "ArrowUp": {
  //     return;
  //   }
  //   case "ArrowDown": {
  //   }
  //   case "Escape": {
  //   }
  // }
  // }

  function handleClick(event) {
    if (textfieldValue === "...") {
      setTextField("");
    }
  }
  function findSentence(event) {
    filtered_sentences = [];

    let sentenceSearchText = event.target.value.toLowerCase();

    // books_suggested = suggestions.books.filter((e) =>
    //   e.title.toLowerCase().includes(bookSearchText)
    // );

    simplifiedSentences.forEach((sentence) => {
      if (
        sentence.english_sentence.includes(sentenceSearchText) ||
        sentence.translated_sentence.includes(sentenceSearchText)
      ) {
        filtered_sentences.push(sentence.uuid);
      }
    });

    console.log(sentenceSearchText);

    console.log(filtered_sentences);
    setTextField(event.target.value);

    if (sentenceSearchText === "") {
      dispatch(updateSearchResults([]));
    } else {
      if (sentenceSearchText.length > 2) {
        dispatch(
          updateSearchResults({ filtered_sentences, sentenceSearchText })
        );
      }
    }
  }

  return (
    <Wrapper>
      <TranscriptSearch
        type="text"
        value={textfieldValue}
        onChange={findSentence}
        // onKeyDown={handleKeyPress}
        onClick={handleClick}
      ></TranscriptSearch>
    </Wrapper>
  );
}

const TranscriptSearch = styled.input`
  height: 30px;
  width: 99%;
  border-color: transparent;
  background-color: ${COLORS_SHOPIFY_GREYS_PALLETE.Lighter};
  border-bottom: 1px solid ${COLORS_SHOPIFY_GREYS_PALLETE.Sky};
  focus: {
    outline: none;
  }
  @media (max-width: 600px) {
    /* width: 200px; */
    width: 98%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 3px;

  @media (max-width: 600px) {
    padding-top: 23px;
  }
`;

export default TopSearch;
