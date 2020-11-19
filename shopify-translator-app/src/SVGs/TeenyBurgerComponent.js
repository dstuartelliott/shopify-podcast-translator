import React from "react";

function TeenyBurgerComponent({ stroke }) {
  return (
    <svg
      width="15"
      height="13"
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 4.5H15M0 0.5H15M0 8.5H15M0 12.5H15" stroke={stroke} />
      {/* <defs>
        <linearGradient
          id="paint0_linear"
          x1="15.5"
          y1="1"
          x2="15.5"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={"#37313C"} />
          <stop offset="1" stopColor={stroke} />
        </linearGradient>
      </defs> */}
    </svg>
  );
}

export default TeenyBurgerComponent;
