import React from "react";
import logo from "./logo.svg";
import Top from "./Top";
import Middle from "./Middle";
import styled from "styled-components";
import "./App.css";

function Scrolltext() {
  return (
    <ScrollWrapper>
      <ScrollText>
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        Header dave Header dave Header dave Header dave Header dave Header dave
        Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
        daveHeader dave Header dave Header dave Header dave Header dave Header
        dave Header dave Header dave Header dave Header dave Header dave Header
      </ScrollText>
    </ScrollWrapper>
  );
}
const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ScrollText = styled.div`
  width: 80%;
  scrollbar-width: 10px;
  background-color: purple;
  overflow: scroll;
  bottom: 20px;
  top: 300px;
  position: absolute;
  margin-left: 10%;
  @media (max-width: 600px) {
    top: 200px;
    bottom: 20px;
  }
`;

export default Scrolltext;
