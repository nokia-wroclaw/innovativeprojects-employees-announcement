import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import logo from "./images/nokia.png";

class NavBar extends Component {
  ChangeToHomePath() {
    window.location = "/";
  }

  ChangeToRegistrationPath() {
    window.location = "/registration";
  }

  ChangeToLoginPath() {
    window.location = "/login";
  }

  render() {
    return (
      <div>
        <Menu inverted attached>
          <Menu.Menu>
            <Menu.Item onClick={this.ChangeToHomePath}>
              <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
              Employee Announcements
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item onClick={this.ChangeToRegistrationPath}>
              Registration
            </Menu.Item>
            <Menu.Item onClick={this.ChangeToLoginPath}>Login</Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
