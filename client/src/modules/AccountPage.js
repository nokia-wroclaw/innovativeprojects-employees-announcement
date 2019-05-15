import {
  NameSettings,
  PasswordSettings,
  ContactSettings
} from "./AccountSettings";
import React, { Component } from "react";
import {
  Grid,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Message
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeName, changePassword, getUser } from "../actions/authActions";
import Page404 from "./Page404";
import axios from "axios";

class AccountPage extends Component {
  constructor(props) {
    super();
    this.id = props.auth.user.id;

    this.state = {
      id: this.id,
      newPassword: "",
      newPasswordConfirmation: "",
      phone: ""
    };
  }

  render() {
    return (
      <div className="accountpage-form" style={{ marginTop: "5em" }}>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 600 }}>
            <Message>
              <Header as="h3" icon>
                <Icon name="settings" />
                Account Settings
                <Header.Subheader>
                  Manage your account settings.
                </Header.Subheader>
              </Header>
            </Message>

            <NameSettings id={this.state.id} changeName={changeName} />

            <PasswordSettings
              id={this.state.id}
              changePassword={changePassword}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

AccountPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { changeName }
)(AccountPage);
