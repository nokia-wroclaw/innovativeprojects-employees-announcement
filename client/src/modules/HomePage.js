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
import axios from "axios";
import AnnouncementAdd from "./AnnouncementAdd";
import Announcement from "./Announcement";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { announcements: [] };
  }

  getAllAnnouncements = () => {
    axios
      .get("/api/announcements/")
      .then(response => {
        this.setState({ announcements: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllAnnouncements(this.announcements);
  }

  announcementsList() {
    return this.state.announcements

      .map(function(currentAnnouncement, i) {
        return <Announcement announcement={currentAnnouncement} key={i} />;
      })
      .reverse(); // ale przy odwrotnej kolejnosci jest skok(opoznienie minimalne), nie wazne, naprawione tym ze reverse() ma byc po funkcji map a nie przed
  }
  render() {
    return (
      <div style={{ marginTop: "5em" }}>
        {this.props.auth.isAuthenticated ? (
          <AnnouncementAdd getAllAnnouncements={this.getAllAnnouncements} />
        ) : (
          ""
        )}

        <Grid padded="vertically" columns={3}>
          <Grid.Column width="3" />
          <Grid.Column width="10">{this.announcementsList()}</Grid.Column>
          <Grid.Column width="2" />
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(HomePage);
