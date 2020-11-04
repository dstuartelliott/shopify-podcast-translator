import React from "react";
import styled from "styled-components/macro";

function Doughnut({ doughnutValues }) {
  return (
    <Wrapper>
      <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
        <circle
          class="donut-hole"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
        ></circle>
        <circle
          class="donut-ring"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#F1EBF5"
          stroke-width="3"
          stroke-linecap="round"
        ></circle>

        <circle
          class="donut-segment"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#FFD159"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray={doughnutValues}
          stroke-dashoffset="0"
        ></circle>
      </svg>{" "}
    </Wrapper>
  );
}

const Pie = styled.div``;

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
`;

export default Doughnut;
