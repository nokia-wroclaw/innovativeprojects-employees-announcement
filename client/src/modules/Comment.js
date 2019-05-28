import React, { Component } from "react";

import { Grid, Segment, Feed, Button, TextArea } from "semantic-ui-react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import ReactTimeAgo from "react-time-ago/tooltip";

import "react-time-ago/Tooltip.css";

import axios from "axios";

import "./Comment.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isEditClicked: false,
      message: this.props.comment.message
    };
  }

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.comment.user_id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  EditIsClicked() {
    this.setState({ isEditClicked: !this.state.isEditClicked });
  }

  EditIsSend() {
    this.setState({ isEditClicked: false });

    let updObj = {
      message: this.state.message
    };

    axios
      .post(`/api/comments/update/${this.props.comment._id}`, updObj)
      .then(data => {
        alert("Comment has been successfully updated ");
      })
      .catch(err => {
        alert("Error while updating comment");
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

    var date = new Date(this.props.comment.date_of_add);

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 850 }}>
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
                    Added by {this.state.user.firstName}{" "}
                    {this.state.user.lastName}{" "}
                    <Link to={"/account-view/" + acc}>
                      {this.state.user.email}
                    </Link>{" "}
                    <ReactTimeAgo
                      date={date}
                      tooltipClassName="TooltipCssComment"
                    />
                  </Feed.Date>

                  <Feed.Extra style={{ width: "90%" }}>
                    {this.state.isEditClicked ? (
                      <TextArea
                        id="message"
                        name="message"
                        style={{ width: "500px", resize: "none" }}
                        defaultValue={this.state.message}
                        value={this.state.message}
                        onChange={this.onChange}
                      />
                    ) : (
                      <div>{this.state.message}</div>
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
        </Grid.Column>
      </Grid>
    );
  }
}

Comment.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Comment);
