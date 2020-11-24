import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";

let divStyle = {
  scope: "profile email",
  width: 100,
  height: 20,
  fontSize: 18,
  longtitle: true,
  borderRaduis: 5,
  color: "#4287f5",
};

const responseGoogle = (response) => {
  console.log(response);
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

  let element = document.getElementById("googleButton");

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
          <LoggedInOrNotDiv>
            <LoggedInOrNot>
              {profileName === "none" ? (
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <GoogleSignInButton
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Login To Google
                    </GoogleSignInButton>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              ) : (
                <GoogleSignInButton>
                  <ProfileImage
                    image_source={profileImg}
                    alt="Podcast Image"
                  ></ProfileImage>
                </GoogleSignInButton>
              )}
            </LoggedInOrNot>
          </LoggedInOrNotDiv>
        </MenuItemWrapper>
      </InternalMenu>
    </Wrapper>
  );
}

const LoggedInOrNotDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: red;
`;

const LoggedInOrNot = styled.button`
  background-color: transparent;
  border: transparent;
  :hover {
    color: #091216;
    cursor: pointer;
  }
  height: 40px;
  background-color: blue;
`;

const ProfileImage = styled.div`
  width: 30px;
  height: 30px;
  background: url("${(props) => props.image_source}");
  background-size: contain;
  background-position: center;
  border-radius: 20px;
`;

const GoogleSignInButton = styled.button`
  height: 20px;
  width: 150px;
  background-color: transparent;
  border: transparent;
  color: black;
  font-weight: bold;
  text-decoration: none;
  text-align: right;
`;

const MenuItemWrapper = styled.div`
  text-align: right;
  height: 40px;
`;
const MenuItemLink = styled(NavLink)`
  padding: 10px;
  height: 25px;
  color: #20404e;
  text-decoration: none;
  :hover {
    color: #091216;
    cursor: hand;
  }
  background-color: red;
`;

const InternalMenu = styled.div`
  background-color: #f1ebf5;
  background: linear-gradient(45deg, #f1ebf5, #fcda71);

  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div``;

export default MenuComponent;