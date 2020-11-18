import React from "react";
import styled from "styled-components/macro";
import { Spring } from "react-spring/renderprops";

let old_doughnut_values = "1, 99";
function Doughnut({
  doughnutValues,
  minutesDrag,
  totalTime,
  dragging,
  playingTime,
  height,
  width,
  hideTotalTime,
  fontSizeUpper,
  fontSizeLower,
}) {
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
        <Wrapper height={height} width={width}>
          <Numbers>
            <Current fontSizeUpper={fontSizeUpper}>
              {dragging ? minutesDrag : playingTime}
            </Current>

            {!hideTotalTime && <Remaining>/ {totalTime}</Remaining>}
          </Numbers>
          <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
            <circle
              className="donut-hole"
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
            ></circle>
            <circle
              className="donut-ring"
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#F1EBF5"
              strokeWidth="3"
              strokeLinecap="round"
            ></circle>

            <circle
              className="donut-segment"
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              // stroke={dragging ? "#FFE9AF" : "#FFD159"}
              stroke="#fddf00"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={props.value}
              strokeDashoffset="0"
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
  text-align: center;
  z-index: 1;
`;
const Current = styled.div`
  text-align: center;
  font-size: ${(props) => props.fontSizeUpper};
`;
const Remaining = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default Doughnut;
