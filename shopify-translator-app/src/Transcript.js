import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

function Transcript() {
  React.useEffect(() => {}, []);

  return <TranscriptWrapper>Transcript</TranscriptWrapper>;
}

const TranscriptWrapper = styled.div`
  background-color: white;
  top: 0px;
`;

export default Transcript;
