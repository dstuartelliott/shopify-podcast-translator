import React from "react";

function CircleSunComponent({ gradient_bottom_x, width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="54.5" cy="54.5" r="54.5" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="54.5"
          y1="1.8045e-08"
          x2="55"
          y2={gradient_bottom_x}
          gradientUnits="userSpaceOnUse"
        >
          {/* <stop stopColor={top} />
          <stop offset="1" stopColor={bottom} /> */}
          <stop stopColor="#FFDECC" />
          <stop offset="1" stopColor="#fde800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default CircleSunComponent;
