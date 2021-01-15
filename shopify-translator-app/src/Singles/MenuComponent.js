import React from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

// };
function goToDave() {
  window.location.href = "https://davidstuartelliott.com";
}

function MenuComponent() {
  // eslint-disable-next-line

  // eslint-disable-next-line

  return (
    <Wrapper>
      <InternalMenu>
        <MenuItemDiv>
          <MenuItemLink to="/">Episode Player</MenuItemLink>
        </MenuItemDiv>
        <MenuItemDiv>
          <MenuItemLink to="/podcastsearch">Find Podcasts</MenuItemLink>
        </MenuItemDiv>
        <MenuItemDiv>
          <MenuItemExternalLink onClick={goToDave}>
            Hire David
          </MenuItemExternalLink>
        </MenuItemDiv>
      </InternalMenu>
    </Wrapper>
  );
}

const MenuItemExternalLink = styled.button`
  height: 40px;

  font-family: Avenir Next;
  font-style: normal;

  font-size: 15px;
  border: 0px;
  padding: 10px;
  background-color: transparent;
  margin-top: -10px;
  color: #20404e;
  text-decoration: none;
  :hover {
    color: #091216;
    cursor: pointer;
  }
`;

const MenuItemDiv = styled.div`
  text-align: right;
  height: 40px;
`;
const MenuItemLink = styled(NavLink)`
  height: 25px;
  padding: 10px;

  /* background-color: red; */
  font-family: Avenir Next;
  font-style: normal;
  font-size: 15px;

  color: #20404e;
  text-decoration: none;
  :hover {
    color: #091216;
    cursor: hand;
  }
`;

const InternalMenu = styled.div`
  background-color: #f1ebf5;
  background: linear-gradient(45deg, #f1ebf5, #fcda71);

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const Wrapper = styled.div``;

export default MenuComponent;
