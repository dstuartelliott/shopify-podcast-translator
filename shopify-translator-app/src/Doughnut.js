import React from "react";
import styled from "styled-components/macro";

function Doughnut({ props }) {
  console.log(props);
  // console.log(doughnutValues.doughnutValues);

  let remaining = 100 - props.dragPercentage;
  let ratios = props.dragPercentage + " ," + remaining;
  console.log(ratios);

  return (
    <Wrapper>
      <Numbers>
        <Current>2:00</Current>
        <Remaining>/ 45:54</Remaining>
      </Numbers>
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
          stroke-dasharray={ratios}
          stroke-dashoffset="0"
        ></circle>
      </svg>{" "}
    </Wrapper>
  );
}

const Numbers = styled.div`
  position: fixed;
  align-self: center;
`;
const Current = styled.div`
  text-align: center;
  font-size: 24px;
`;
const Remaining = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  width: 138px;
  height: 138px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default Doughnut;
