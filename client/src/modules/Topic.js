import React, { Component } from "react";

import { Segment, Feed, Button, Input, TextArea } from "semantic-ui-react";
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
      description: this.props.topic.description
    };
  }

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

  EditIsClicked() {
    this.setState({ isEditClicked: !this.state.isEditClicked });
  }

  EditIsSend() {
    this.setState({ isEditClicked: false });

    let updObj = {
      description: this.state.description,
      title: this.state.title
    };

    axios
      .post(`/api/topics/update/${this.props.topic._id}`, updObj)
      .then(data => {
        alert("Topic has been successfully updated ");
      })
      .catch(err => {
        this.backWhenErr();
        alert("Error while updating topic - blank fields or wrong format");
      });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  backWhenErr() {
    this.setState({
      title: this.props.topic.title,
      description: this.props.topic.description
    });
  }

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
                <ReactTimeAgo date={date} tooltipClassName="TooltipCssTopic" />
              </Feed.Date>
              <Feed.Summary style={{ fontSize: "20px" }}>
                {" "}
                {this.state.isEditClicked ? (
                  <Input
                    id="title"
                    name="title"
                    defaultValue={this.props.topic.title}
                    value={this.state.title}
                    onChange={this.onChange}
                    style={{ width: "1000 px" }}
                  />
                ) : (
                  <Link to={"/topics/" + top}>{this.state.title}</Link>
                )}
              </Feed.Summary>
              <Feed.Extra style={{ width: "90%" }}>
                {this.state.isEditClicked ? (
                  <TextArea
                    id="description"
                    name="description"
                    style={{ width: "1000px", resize: "none" }}
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
