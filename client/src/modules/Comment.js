import React, { Component } from "react";

import {
  Grid,
  Segment,
  Feed,
  Button,
  TextArea,
  Form,
  Confirm
} from "semantic-ui-react";
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
      message: "",
      errors: {},
      messageErrorEmpty: "",
      open: false
    };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  componentDidMount() {
    this.setState({
      message: this.props.comment.message
    });
    axios
      .get(`/api/users/${this.props.comment.user_id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        message: this.props.comment.message
      });
      axios
        .get(`/api/users/${this.props.comment.user_id}`)
        .then(response => {
          this.setState({ user: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  validate = () => {
    let isError = false;
    const errors = {
      messageErrorEmpty: ""
    };
    if (this.state.message.trim() === "") {
      isError = true;
      errors.messageErrorEmpty = "Message cannot be empty";
    }

    if (isError) {
      this.setState(errors);
    }

    return isError;
  };

  EditIsClicked() {
    this.setState({ isEditClicked: !this.state.isEditClicked });
    axios
      .get(`/api/comments/${this.props.comment._id}`)
      .then(response => {
        this.setState({
          message: response.data.message
        });
      })
      .catch(err => {
        alert("Error while getting comment");
      });
  }

  EditIsSend = e => {
    const err = this.validate();

    if (!err) {
      let updObj = {
        message: this.state.message
      };

      axios
        .post(`/api/comments/update/${this.props.comment._id}`, updObj)
        .then(data => {
          alert("Comment has been successfully updated ");
          this.setState({ isEditClicked: false });
        })
        .catch(err => {
          alert("Error while updating comment - blank field");
        });
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  ButtonDelete = e => {
    this.close();

    axios
      .post(`/api/comments/delete/${this.props.comment._id}`)
      .then(data => {
        alert("Comment has been successfully deleted");
        this.props.commentDelete(this.props.comment._id);

        //this.props.getAllComments();
      })
      .catch(err => {
        alert("Error while deleting comment");
      });
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
          <Segment style={{ width: "100%" }}>
            {user.id === this.state.user._id || user.isAdmin ? (
              <>
                <>
                  <Button color="vk" floated="right" onClick={this.open}>
                    Delete
                  </Button>
                  <Confirm
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={this.ButtonDelete}
                  />
                </>
                <Button
                  color="vk"
                  floated="right"
                  onClick={() => this.EditIsClicked()}
                >
                  {" "}
                  Edit{" "}
                </Button>
              </>
            ) : (
              ""
            )}

            {this.state.isEditClicked ? (
              <Form size="large" noValidate onSubmit={this.EditIsSend}>
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
                      <div class="errorsColor">
                        {this.state.messageErrorEmpty}
                      </div>
                      <TextArea
                        id="message"
                        name="message"
                        style={{ width: "500px", resize: "none" }}
                        defaultValue={this.state.message}
                        value={this.state.message}
                        onChange={this.onChange}
                      />
                    </Feed.Content>
                  </Feed.Event>
                </Feed>

                <Button>Apply </Button>
              </Form>
            ) : (
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
                      <div>{this.state.message}</div>
                    </Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
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
