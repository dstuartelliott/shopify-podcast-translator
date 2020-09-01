import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

function TranscriptSentence({ sentence }) {
  React.useEffect(() => {}, []);

  return <TranscriptSentenceWrapper>{sentence}</TranscriptSentenceWrapper>;
}

const TranscriptSentenceWrapper = styled.div`
  background-color: white;
  text-align: left;
  padding: 10px;
`;

export default TranscriptSentence;
