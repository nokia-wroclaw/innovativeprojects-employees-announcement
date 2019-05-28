import { NameSettings, PasswordSettings } from "./AccountSettings";
import React, { Component } from "react";
import { Grid, Header, Icon, Segment, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeName, changePassword } from "../actions/authActions";

import axios from "axios";
import FileBase from "react-file-base64";
import DefaultImg from "./images/default-img.jpg";

class AccountPage extends Component {
  constructor(props) {
    super();
    this.id = props.auth.user.id;

    this.state = {
      id: this.id,
      newPassword: "",
      newPasswordConfirmation: "",
      phone: "",
      user: {},
      baseImage: DefaultImg
    };
  }

  componentDidMount() {
    axios
      .get(`/api/users/${this.id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getBaseFile(files) {
    // create a local readable base64 instance of an image
    let user = Object.assign({}, this.state.user); //creating copy of object
    user.image = files.base64; //updating value
    this.setState({ user });

    let imageObj = {
      image: files.base64.toString()
    };

    axios
      .post(`/api/users/update/photo/${this.state.id}`, imageObj)
      .then(data => {
        alert("Image has been successfully uploaded ");
      })
      .catch(err => {
        alert("Error while uploading image, size is too big");
      });
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
            <Segment>
              <Header as="h4" color="blue" textAlign="center">
                Change your avatar
              </Header>
              <div>
                <div>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={this.getBaseFile.bind(this)}
                  />
                </div>
                <div style={{ marginTop: "1em" }}>
                  <img
                    src={this.state.user.image}
                    alt="upload"
                    className="process__image"
                    style={({ maxHeight: "20em" }, { maxWidth: "20em" })}
                  />
                </div>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid style={{ marginTop: "5em" }} />
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
