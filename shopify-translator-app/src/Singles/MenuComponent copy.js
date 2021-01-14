import React from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

let divStyle = {
  scope: "profile email",
  width: 100,
  height: 20,
  fontSize: 18,
  longtitle: true,
  borderRaduis: 5,
  color: "#4287f5",
};

function MenuComponent() {
  const [profileName, setProfileName] = React.useState("none");
  const [profileImg, setProfileImg] = React.useState("none");

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // var id_token = googleUser.getAuthResponse().id_token;

    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    // console.log("Email: " + id_token); // This is null if the 'email' scope is not present.

    setProfileName(profile.getName());
  }

  React.useEffect(() => {
    async function getGoogle() {
      if (window.gapi !== undefined) {
        window.gapi.load("auth2", async function () {
          console.log("google");
          let auth_object = await window.gapi.auth2.init({
            client_id:
              "112704103478-qojm07it64b672dk2mto976ivf6592jm.apps.googleusercontent.com",
          });

          let current_user = auth_object.currentUser.get();

          let profile = current_user.getBasicProfile();

          setProfileName(profile.getName());

          setProfileImg(profile.getImageUrl());
          console.log(current_user);

          console.log(profile);
        });
      }
    }

    getGoogle();

    // window.gapi.load("auth2", () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id: "YOUR_CLIENT_ID",
    //   });
    // });

    // eslint-disable-next-line
  }, []);

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
          <MenuItem>
            <GoogleSignIn
              className="g-signin2"
              data-onsuccess="onSignIn"
              style={divStyle}
            ></GoogleSignIn>
          </MenuItem>

          <MenuItem>
            <ProfileName>{profileName}</ProfileName>
            <ProfileImage
              image_source={profileImg}
              alt="Podcast Image"
            ></ProfileImage>

            {/* <div>hello {profileName}</div> */}
          </MenuItem>
        </MenuItemWrapper>
      </InternalMenu>
    </Wrapper>
  );
}

const ProfileName = styled.div``;

const ProfileImage = styled.div`
  width: 20px;
  height: 20px;
  background: url("${(props) => props.image_source}");
  background-size: contain;
  background-position: center;
  border-radius: 5px;
`;

const GoogleSignIn = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 80px;
`;

const InternalMenu = styled.div`
  background-color: #f1ebf5;
  background: linear-gradient(45deg, #f1ebf5, #fcda71);

  border-radius: 5px;
`;

const MenuItemWrapper = styled.div``;
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
  width: 10px;
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
