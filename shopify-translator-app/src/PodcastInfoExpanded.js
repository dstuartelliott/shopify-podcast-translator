import React from "react";
import styled from "styled-components";

function PodcastInfoExpanded(passedSize) {
  React.useEffect(() => {
    console.log(passedSize);
  });

  return (
    <Wrapper>
      {" "}
      stuff inside here
      <p></p>
      <Dave>dave stuff</Dave>
    </Wrapper>
  );
  // }
}

const Wrapper = styled.div`
  height: 100px;
`;
const Dave = styled.div`
  height: 50px;
  background-color: red;
`;

export default PodcastInfoExpanded;
