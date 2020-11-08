import React from "react";

function PlaySVGComponent({ stroke }) {
  return (
    <svg
      width="28"
      height="30"
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
