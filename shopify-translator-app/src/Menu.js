import React from "react";
import styled from "styled-components";

import { COLORS_SHOPIFY_GREYS_PALLETE } from "./constants.js";

import Hamburger from "../Hamburger/Hamburger";

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  return (
    <div>
      <StyledMenu open={open}>
        <StyledLink onClick={() => close()}>Link 1</StyledLink>
        <StyledLink onClick={() => close()}>Link 2</StyledLink>
        <StyledLink onClick={() => close()}>Link 3</StyledLink>
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
    </div>
  );
};

const StyledMenu = styled.nav`
  top: 0;
  left: 0;
  height: 100vh;
  width: 35vw;
  position: fixed;
  background-color: ${colors.lightbrown};
  z-index: 1;
  padding: 10rem 0;
  flex-direction: column;
  display: ${({ open }) => (open ? "flex" : "none")};
`;
const StyledLink = styled.a`
  padding: 0 2rem;
  font-size: 2rem;
  color: ${colors.pearl};
  text-decoration: none;

  :hover {
    color: ${COLORS_SHOPIFY_GREYS_PALLETE.Sky};
    cursor: pointer;
  }
`;

export default Menu;
