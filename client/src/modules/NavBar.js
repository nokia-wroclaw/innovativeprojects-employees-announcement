import React, { Component } from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import logo from "./images/nokia_white.png";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  ChangeToHomePath() {
    window.location = "/";
  }

  ChangeToRegistrationPath() {
    window.location = "/registration";
  }

  ChangeToLoginPath() {
    window.location = "/login";
  }

  ChangeToTopicsPath() {
    window.location = "/topics";
  }

  ChangeToProfilePath = userMail => e => {
    window.location = "/account-view/" + userMail;
  };

  ChangeToAccountPath() {
    window.location = "/account";
  }

  render() {
    const { user } = this.props.auth;
    var acc = new String(user.email);
    acc = acc.substring(0, acc.indexOf("@"));

    return (
      <div>
        <Menu fixed="top" inverted>
          <Menu.Menu>
            <Menu.Item onClick={this.ChangeToHomePath}>
              <Image size="tiny" src={logo} style={{ marginRight: "1.5em" }} />
            </Menu.Item>
            <Dropdown
              text="Employees Announcements"
              pointing
              className="link item"
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.ChangeToHomePath}>
                  Announcements
                </Dropdown.Item>
                <Dropdown.Item onClick={this.ChangeToTopicsPath}>
                  Topics
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Dropdown text="Mode" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.props.ChangeToDarkMode}>
                  DarkMode
                </Dropdown.Item>
                <Dropdown.Item onClick={this.props.ChangeToLightMode}>
                  LightMode
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {this.props.auth.isAuthenticated ? (
              <>
                <Dropdown
                  text="Logged in"
                  pointing
                  className="link item"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.ChangeToProfilePath(acc)}>
                      Your Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.ChangeToAccountPath}>
                      Account Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.onLogoutClick}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Menu.Item onClick={this.ChangeToRegistrationPath}>
                  Registration
                </Menu.Item>
                <Menu.Item onClick={this.ChangeToLoginPath}>Login</Menu.Item>
              </>
            )}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
