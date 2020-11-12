import React from "react";

function PlaySVGComponent({ stroke, height, width }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 29V1L27 15L1 29Z"
        stroke={stroke}
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default PlaySVGComponent;
