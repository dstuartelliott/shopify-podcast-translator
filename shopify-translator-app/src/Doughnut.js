import React from "react";
import styled from "styled-components/macro";
import { Spring, config } from "react-spring/renderprops";

let old_doughnut_values = "1, 99";
function Doughnut({
  doughnutValues,
  minutesDrag,
  totalTime,
  dragging,
  playingTime,
}) {
  // console.log(doughnutValues.doughnutValues);

  React.useEffect(() => {
    old_doughnut_values = "1,99";
    doughnutValues = "1,99";
  }, []);

  function done() {
    old_doughnut_values = doughnutValues;
  }

  return (
    <Spring
      onRest={done}
      from={{ value: old_doughnut_values }}
      to={{ value: doughnutValues }}
    >
      {(props) => (
        <Wrapper>
          <Numbers>
            <Current>{dragging ? minutesDrag : playingTime}</Current>
            <Remaining>/ {totalTime}</Remaining>
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
              // stroke={dragging ? "#FFE9AF" : "#FFD159"}
              stroke="#FFD159"
              stroke-width="3"
              stroke-linecap="round"
              stroke-dasharray={props.value}
              stroke-dashoffset="0"
            ></circle>
          </svg>{" "}
        </Wrapper>
      )}
    </Spring>
  );
}

const Numbers = styled.div`
  position: fixed;
  align-self: center;
  color: #605866;
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
