import React, { Component } from "react";

import { Button, Segment, Input, TextArea, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import ReactTimeAgo from "react-time-ago/tooltip";

import "react-time-ago/Tooltip.css";

import axios from "axios";

import "./Announcement.css";

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isEditClicked: false,
      description: this.props.announcement.description,
      price: this.props.announcement.price,
      title: this.props.announcement.title
    };
  }

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.announcement.user_id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  EditIsClicked() {
    this.setState({ isEditClicked: true });
  }

  EditIsSend() {
    this.setState({ isEditClicked: false });

    let updObj = {
      description: this.state.description,
      title: this.state.title,
      price: this.state.price
    };

    axios
      .post(`/api/announcements/update/${this.props.announcement._id}`, updObj)
      .then(data => {
        alert("Announcement has been successfully updated ");
      })
      .catch(err => {
        alert("Error while uploading image, size is too big");
      });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { user } = this.props.auth;
    var acc = new String(this.state.user.email);
    //  acc = acc.substring(0, acc.indexOf("@"));
    //    var date =
    //    new Date(this.props.announcement.date_of_add).toLocaleTimeString() +
    //      ", " +
    //      new Date(this.props.announcement.date_of_add).toLocaleDateString();

    var date = new Date(this.props.announcement.date_of_add);

    return (
      <Segment>
        {user.id === this.state.user._id ? (
          <Button floated="right" onClick={() => this.EditIsClicked()}>
            {" "}
            Edit{" "}
          </Button>
        ) : (
          ""
        )}
        <Feed style={{ marginTop: "1.5em" }}>
          <Feed.Event>
            <Feed.Label>
              <img src={this.state.user.image} alt="avatar" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Date>
                Added by {this.state.user.firstName} {this.state.user.lastName}{" "}
                <Link to={"/account-view/" + acc}>{this.state.user.email}</Link>{" "}
                <ReactTimeAgo
                  date={date}
                  tooltipClassName="TooltipCssAnnouncement"
                />
              </Feed.Date>
              <Feed.Summary style={{ fontSize: "20px" }}>
                {" "}
                {this.state.isEditClicked ? (
                  <Input
                    id="title"
                    name="title"
                    defaultValue={this.props.announcement.title}
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                ) : (
                  <div>{this.state.title}</div>
                )}
              </Feed.Summary>
              <Feed.Extra text>
                <p>
                  {this.state.isEditClicked ? (
                    <Input
                      id="price"
                      name="price"
                      defaultValue={this.props.announcement.price}
                      value={this.state.price}
                      onChange={this.onChange}
                    />
                  ) : (
                    <div>
                      <b>Price: </b> {this.state.price}
                      [zł]
                    </div>
                  )}
                </p>
              </Feed.Extra>
              <Feed.Extra style={{ width: "90%" }}>
                {this.state.isEditClicked ? (
                  <TextArea
                    id="description"
                    name="description"
                    style={{ resize: "none" }}
                    defaultValue={this.state.description}
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                ) : (
                  <div>{this.state.description}</div>
                )}
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        {this.state.isEditClicked ? (
          <Button onClick={() => this.EditIsSend()}>Apply </Button>
        ) : (
          ""
        )}
      </Segment>
    );
  }
}

Announcement.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Announcement);
