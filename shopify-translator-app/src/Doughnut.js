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
          fill="#fff"
        ></circle>
        <circle
          class="donut-ring"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#d2d3d4"
          stroke-width="3"
        ></circle>

        <circle
          class="donut-segment"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#ce4b99"
          stroke-width="3"
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
