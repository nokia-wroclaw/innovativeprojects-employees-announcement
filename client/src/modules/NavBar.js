import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import logo from "./images/nokia.png";

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

  render() {
    return (
      <div>
        <Menu inverted attached>
          <Menu.Menu>
            <Menu.Item onClick={this.ChangeToHomePath}>
              <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
              Employees Announcements
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            {this.props.auth.isAuthenticated ? (
              <Menu.Item onClick={this.onLogoutClick}>Logout</Menu.Item>
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
