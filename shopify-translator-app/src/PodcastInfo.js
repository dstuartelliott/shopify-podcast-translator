import React from "react";
import styled from "styled-components";

function PodcastInfo() {
  return (
    <PodcastInfoWrapper>
      <PodcastTitle>
        <displayXlarge>
          The Pre-Launch Strategies of a Million-Dollar Brand
        </displayXlarge>
      </PodcastTitle>
    </PodcastInfoWrapper>
  );
}

const PodcastTitle = styled.div``;

const PodcastInfoWrapper = styled.div`
  text-align: center;
  max-width: 800px;
  background-color: red;
  margin-left: 140px;
  padding: 30px;
`;

export default PodcastInfo;
