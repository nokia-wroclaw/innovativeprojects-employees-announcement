import React, { Component } from "react";
import { Menu, Image, Dropdown, Input } from "semantic-ui-react";
import logo from "./images/logoNowe.png";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import { Link } from "react-router-dom";

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    var acc = new String(user.email);
    //    acc = acc.substring(0, acc.indexOf("@"));

    return (
      <div>
        <Menu fixed="top" inverted>
          <Menu.Menu>
            <Dropdown
              text="Employees Announcements"
              pointing
              className="link item"
            >
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/">
                  Announcements
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/topics">
                  Topics
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {this.props.showNavFieldsAnn || this.props.showNavFieldsTop ? (
              <Input
                action={{
                  color: "black",
                  labelPosition: "left",
                  icon: "search",
                  content: "Search"
                }}
                placeholder="Search..."
                actionPosition="left"
                onChange={this.props.onChange}
              />
            ) : (
              ""
            )}
          </Menu.Menu>
          <Menu.Menu position="right">
            <Dropdown text="Change Theme" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.props.ChangeToLightMode}>
                  LightMode
                </Dropdown.Item>
                <Dropdown.Item onClick={this.props.ChangeToDarkMode}>
                  DarkMode
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {this.props.auth.isAuthenticated ? (
              <>
                <Dropdown text={user.email} pointing className="link item">
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={"/account-view/" + acc}>
                      Your Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/account">
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
                <Menu.Item as={Link} to="/registration">
                  Registration
                </Menu.Item>
                <Menu.Item as={Link} to="/login">
                  Login
                </Menu.Item>
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
