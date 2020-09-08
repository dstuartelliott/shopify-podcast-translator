import React, { Component } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

function ScrollableText() {
  React.useEffect(() => {
    console.log("app");

    // speechSynthesis.addEventListener("voiceschanged", function () {
    //   let voices_new = speechSynthesis.getVoices();
    //   console.log(voices_new);

    // });
  }, []);

  function ScrollToBottom() {
    let element = document.getElementById("dave");
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  if (isMobile) {
    return <div> Mobile version coming soon (like, in a day) </div>;
  } else {
    return (
      <div>
        <Button onClick={ScrollToBottom}>hello</Button>
        <ScrollDivWrapper>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <Dave id="dave">dave</Dave>
        </ScrollDivWrapper>
      </div>
    );
  }
}

const Button = styled.button``;
const Dave = styled.div``;

const ScrollDivWrapper = styled.div`
  overflow: scroll;
  height: 200px;
`;

export default ScrollableText;
