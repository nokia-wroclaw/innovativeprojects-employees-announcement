import React, { Component } from "react";

import {
  Segment,
  Feed,
  Button,
  Input,
  TextArea,
  Form,
  Confirm
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import axios from "axios";

import ReactTimeAgo from "react-time-ago/tooltip";

import "react-time-ago/Tooltip.css";

import "./Topic.css";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isEditClicked: false,
      title: this.props.topic.title,
      description: this.props.topic.description,
      errors: {},
      titleErrorEmpty: "",
      descriptionErrorEmpty: "",
      open: false
    };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.topic.user_id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  validate = () => {
    let isError = false;
    const errors = {
      titleErrorEmpty: "",
      descriptionErrorEmpty: ""
    };
    if (this.state.title.trim() === "") {
      isError = true;
      errors.titleErrorEmpty = "Title cannot be empty";
    }

    if (this.state.description.trim() === "") {
      isError = true;
      errors.descriptionErrorEmpty = "Description cannot be empty";
    }

    if (isError) {
      this.setState(errors);
    }

    return isError;
  };

  EditIsClicked() {
    this.setState({
      isEditClicked: !this.state.isEditClicked
    });
    axios
      .get(`/api/topics/${this.props.topic._id}`)
      .then(response => {
        this.setState({
          description: response.data.description,
          title: response.data.title
        });
      })
      .catch(err => {
        alert("Error while getting topic");
      });
  }

  EditIsSend = e => {
    const err = this.validate();

    if (!err) {
      let updObj = {
        description: this.state.description,
        title: this.state.title
      };

      axios
        .post(`/api/topics/update/${this.props.topic._id}`, updObj)
        .then(data => {
          alert("Topic has been successfully updated ");
          this.setState({ isEditClicked: false });
        })
        .catch(err => {
          alert("Error while updating topic - blank fields or wrong format");
        });
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  ButtonDelete = e => {
    this.close();

    axios
      .post(`/api/topics/delete/${this.props.topic._id}`)
      .then(data => {
        alert("Topic has been successfully deleted");
        this.props.topicDelete(this.props.topic._id);
      })
      .catch(err => {
        alert("Error while deleting topic");
      });
  };

  render() {
    const { user } = this.props.auth;
    var acc = new String(this.state.user.email);
    //  acc = acc.substring(0, acc.indexOf("@"));
    var top = new String(this.props.topic._id);
    //    var date2 =
    //      new Date(this.props.topic.date_of_add).toLocaleTimeString() +
    //      ", " +
    //      new Date(this.props.topic.date_of_add).toLocaleDateString();
    var date = new Date(this.props.topic.date_of_add);
    return (
      <Segment style={{ width: "100%" }}>
        {user.id === this.state.user._id || user.isAdmin ? (
          <>
            <>
              <Button floated="right" onClick={this.open}>
                Delete
              </Button>
              <Confirm
                open={this.state.open}
                onCancel={this.close}
                onConfirm={this.ButtonDelete}
              />
            </>
            <Button floated="right" onClick={() => this.EditIsClicked()}>
              {" "}
              Edit{" "}
            </Button>
          </>
        ) : (
          ""
        )}

        {this.state.isEditClicked ? (
          <>
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
                        tooltipClassName="TooltipCssTopic"
                      />
                    </Feed.Date>
                    <div class="errorsColor">{this.state.titleErrorEmpty}</div>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={this.props.topic.title}
                      value={this.state.title}
                      onChange={this.onChange}
                      style={{ width: "30vw" }}
                    />

                    <div class="errorsColor">
                      {this.state.descriptionErrorEmpty}
                    </div>
                    <TextArea
                      id="description"
                      name="description"
                      style={{ width: "30vw", resize: "none" }}
                      defaultValue={this.state.description}
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </Feed.Content>
                </Feed.Event>
              </Feed>

              <Button>Apply </Button>
            </Form>
          </>
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
                    tooltipClassName="TooltipCssTopic"
                  />
                </Feed.Date>
                <Feed.Summary style={{ fontSize: "20px" }}>
                  {" "}
                  <Link to={"/topics/" + top}>{this.state.title}</Link>
                </Feed.Summary>
                <Feed.Extra style={{ width: "90%" }}>
                  <div>{this.state.description}</div>
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        )}
      </Segment>
    );
  }
}

Topic.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Topic);
