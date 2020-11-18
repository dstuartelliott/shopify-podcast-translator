import React from "react";

import styled, { keyframes } from "styled-components";

import { NavLink } from "react-router-dom";

function MenuComponent() {
  return (
    <Wrapper>
      <InternalMenu>
        <MenuItemWrapper>
          <MenuItem>Episode Player</MenuItem>
          <MenuItemLink to="/" />
        </MenuItemWrapper>
        <MenuItemWrapper>
          <MenuItem>Find Podcasts</MenuItem>
          <MenuItemLink to="/podcastsearch" />
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem>Starred Clips</MenuItem>
          <MenuItemLink to="/podcastsearch" />
        </MenuItemWrapper>

        <MenuItemWrapper>
          <MenuItem>Login</MenuItem>
          <MenuItemLink to="/podcastsearch" />
        </MenuItemWrapper>
      </InternalMenu>
    </Wrapper>
  );
}

const InternalMenu = styled.div`
  background-color: #f1ebf5;
  background: linear-gradient(45deg, #f1ebf5, #fcda71);

  border-radius: 5px;
`;

const MenuItemWrapper = styled.div``;
const Menu = styled.div`
  overflow: hidden;
`;
const MenuItemLink = styled(NavLink)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  background-color: transparent;
  position: absolute;
  transform: translateY(-25px);
  z-index: 99;

  position: absolute;
  height: 25px;
  width: 180px;
`;

const MenuItem = styled.div`
  padding-top: 5px;
  padding-right: 10px;
  height: 25px;
  color: #20404e;
  :hover {
    color: #091216;
    cursor: hand;
  }
  text-align: right;
`;

const Wrapper = styled.div``;

export default MenuComponent;
