import React from "react";

function PauseSVGComponent({ stroke, height, width, strokeWidth }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.20001 0.200012V21.8M11.8 0.200012V21.8"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default PauseSVGComponent;
