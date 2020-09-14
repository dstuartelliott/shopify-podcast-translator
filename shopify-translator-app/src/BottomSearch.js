import React from "react";
import styled from "styled-components";
import HeroSrc from "./images/shopify_masters_hero.jpg";
import {
  COLORS_SHOPIFY_YELLOW_PALLETE,
  COLORS_SHOPIFY_GREYS_PALLETE,
} from "./constants.js";

import { useSelector } from "react-redux";
import { getLCSentencesForSearch } from "./reducers";
import { Truncate } from "@shopify/polaris";
import { updateSearchResults } from "./actions";
import { useDispatch } from "react-redux";

let filtered_sentences = [];

function BottomSearch() {
  const dispatch = useDispatch();

  const [textfieldValue, setTextField] = React.useState("");
  let simplifiedSentences = useSelector(getLCSentencesForSearch);

  function handleKeyPress(event) {
    // console.log(event.key);
    switch (event.key) {
      case "Enter": {
        // selectBook();
        // handleSelect(ev.target.value);
        return;
      }
      case "ArrowUp": {
        // selectedSuggestionIndex = selectedSuggestionIndex - 1;
        // if (selectedSuggestionIndex < 0) {
        //   selectedSuggestionIndex = 0;
        // }
        // findBook(event);
        return;
      }
      case "ArrowDown": {
        // selectedSuggestionIndex = selectedSuggestionIndex + 1;
        // if (selectedSuggestionIndex > book_rendered_count - 1) {
        //   selectedSuggestionIndex = book_rendered_count - 1;
        // }
        // findBook(event);
        return;
        // TODO: Handle moving the selection down
      }
      case "Escape": {
        // clear();
      }
    }
  }

  function findSentence(event) {
    filtered_sentences = [];

    let sentenceSearchText = event.target.value.toLowerCase();

    // books_suggested = suggestions.books.filter((e) =>
    //   e.title.toLowerCase().includes(bookSearchText)
    // );

    setTextField(event.target.value);

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

    if (sentenceSearchText === "") {
      dispatch(updateSearchResults([]));
    } else {
      dispatch(updateSearchResults(filtered_sentences));
    }
  }

  return (
    <Wrapper>
      <TranscriptSearch
        type="text"
        value={textfieldValue}
        onChange={findSentence}
        onKeyDown={handleKeyPress}
      ></TranscriptSearch>
    </Wrapper>
  );
}

const TranscriptSearch = styled.input`
  height: 30px;
  width: 95%;
  margin-left: 10px;
  border-color: transparent;
  background-color: ${COLORS_SHOPIFY_GREYS_PALLETE.Light};
  border-bottom: 1px solid ${COLORS_SHOPIFY_GREYS_PALLETE.Sky};
  focus: {
    outline: none;
  }
  border-radius: 5px;
`;

const TitleText = styled.div`
  width: 200px;

  @media (min-width: 600px) {
    /* background-color: red; */
    align-self: flex-start;
    max-width: 280px;
  }
`;

const Wrapper = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;

    /* background-color: red; */
  }
`;

export default BottomSearch;
