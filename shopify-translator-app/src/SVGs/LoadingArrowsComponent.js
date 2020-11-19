import React from "react";

function LoadingArrowsComponent({ stroke, height, width }) {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 14.5C1 7.02575 7.04416 0.966667 14.5 0.966667C18.8026 0.966667 22.635 2.98443 25.1071 6.12751M28 14.5C28 21.9743 21.9558 28.0333 14.5 28.0333C10.1974 28.0333 6.36497 26.0156 3.89286 22.8725M9.67857 22.2333H2.92857V29M26.0714 0V6.76667L19.3214 6.76667"
        stroke="#403845"
      />
    </svg>
  );
}

export default LoadingArrowsComponent;
