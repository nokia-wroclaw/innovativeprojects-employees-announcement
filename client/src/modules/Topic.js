import React, { Component } from "react";

import {
  Grid,
  GridRow,
  Menu,
  Sticky,
  Segment,
  Rail,
  GridColumn,
  Feed
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
    this.state = { user: {}, topic: {} };
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

  render() {
    var acc = new String(this.state.user.email);
    acc = acc.substring(0, acc.indexOf("@"));
    var top = new String(this.props.topic._id);
    //    var date2 =
    //      new Date(this.props.topic.date_of_add).toLocaleTimeString() +
    //      ", " +
    //      new Date(this.props.topic.date_of_add).toLocaleDateString();
    var date = new Date(this.props.topic.date_of_add);
    return (
      <Segment>
        <Feed style={{ marginTop: "1.5em" }}>
          <Feed.Event>
            <Feed.Label image={require("./images/2pac.jpg")} />
            <Feed.Content>
              <Feed.Date>
                Added by {this.state.user.firstName} {this.state.user.lastName}{" "}
                <Link to={"/account-view/" + acc}>{this.state.user.email}</Link>{" "}
                <ReactTimeAgo date={date} tooltipClassName="TooltipCssTopic" />
              </Feed.Date>
              <Feed.Summary style={{ fontSize: "20px" }}>
                {" "}
                <Link to={"/topics/" + top}>{this.props.topic.title}</Link>{" "}
              </Feed.Summary>

              <Feed.Extra style={{ width: "90%" }}>
                {this.props.topic.description}
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
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
