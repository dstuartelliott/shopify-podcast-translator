import React from "react";
import styled from "styled-components";

const Hamburger = (props) => (
  <StyledHamburger open={props.open} onClick={() => props.setOpen(!props.open)}>
    <div />
    <div />
    <div />
  </StyledHamburger>
);

const StyledHamburger = styled.button`
  position: fixed;
  left: 3vw;
  top: 3vw;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1;
  div {
    position: relative;
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    background-color: ${({ open }) => (open ? red : blue)};
  }
`;

export default Hamburger;
