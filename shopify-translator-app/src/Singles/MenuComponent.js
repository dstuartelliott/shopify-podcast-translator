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
        <MenuItemWrapper>
          <MenuItemLink to="/">Episode Player</MenuItemLink>
        </MenuItemWrapper>
        <MenuItemWrapper>
          <MenuItemLink to="/podcastsearch">Find Podcasts</MenuItemLink>
        </MenuItemWrapper>
        <MenuItemWrapper>
          <MenuItemExternalLink onClick={goToDave}>
            Hire David
          </MenuItemExternalLink>
        </MenuItemWrapper>
      </InternalMenu>
    </Wrapper>
  );
}

const MenuItemExternalLink = styled.button`
  height: 15px;

  font-family: Avenir Next;
  font-style: normal;

  font-weight: 500;
  font-size: 15px;
  background-color: transparent;
  border: 0px;

  color: #20404e;
  text-decoration: none;
  :hover {
    color: #00848e;
    cursor: hand;
  }
`;

const MenuItemWrapper = styled.div`
  text-align: right;
  height: 40px;
`;
const MenuItemLink = styled(NavLink)`
  height: 25px;
  padding: 10px;

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
  padding-top: 20px;
`;

const Wrapper = styled.div``;

export default MenuComponent;
