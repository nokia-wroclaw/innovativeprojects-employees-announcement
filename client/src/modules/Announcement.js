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

import ReactTimeAgo from "react-time-ago/tooltip";

import "react-time-ago/Tooltip.css";

import axios from "axios";

import "./Announcement.css";

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
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

  render() {
    var acc = new String(this.state.user.email);
    //  acc = acc.substring(0, acc.indexOf("@"));
    //    var date =
    //    new Date(this.props.announcement.date_of_add).toLocaleTimeString() +
    //      ", " +
    //      new Date(this.props.announcement.date_of_add).toLocaleDateString();

    var date = new Date(this.props.announcement.date_of_add);

    return (
      <Segment>
        <Feed style={{ marginTop: "1.5em" }}>
          <Feed.Event>
            <Feed.Label>
              <img src={this.state.user.image} />
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
                {this.props.announcement.title}
              </Feed.Summary>
              <Feed.Extra text>
                <p>
                  <b>Price: </b> {this.props.announcement.price} [zł]
                </p>
              </Feed.Extra>
              <Feed.Extra style={{ width: "90%" }}>
                {this.props.announcement.description}
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
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
