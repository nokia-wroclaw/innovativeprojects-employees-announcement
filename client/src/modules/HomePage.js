import React, { Component } from "react";

import {
  Grid,
  GridColumn,
  Button,
  Header,
  Input,
  Menu,
  Sticky
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
    this.state = {
      announcements: [],
      announcementAddVisible: false,
      noFilter: true,
      reverseFilter: false,
      searchFilter: false,
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
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

  buttonAnnouncementAdd() {
    this.setState({
      announcementAddVisible: !this.state.announcementAddVisible
    });
  }

  componentDidMount() {
    this.getAllAnnouncements(this.announcements);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  noFilterFun() {
    this.setState({
      noFilter: true,
      reverseFilter: false,
      searchFilter: false
    });
  }

  reverseFilterFun() {
    this.setState({
      noFilter: false,
      reverseFilter: true,
      searchFilter: false
    });
  }

  searchFilterFun() {
    this.setState({
      noFilter: false,
      reverseFilter: false,
      searchFilter: true
    });
  }

  announcementsList() {
    if (this.state.noFilter) {
      return this.state.announcements

        .map(function(currentAnnouncement, i) {
          return <Announcement announcement={currentAnnouncement} key={i} />;
        })
        .reverse(); // ale przy odwrotnej kolejnosci jest skok(opoznienie minimalne), nie wazne, naprawione tym ze reverse() ma byc po funkcji map a nie przed
    }
    if (this.state.reverseFilter) {
      return this.state.announcements.map(function(currentAnnouncement, i) {
        return <Announcement announcement={currentAnnouncement} key={i} />;
      });
    }

    if (this.state.searchFilter) {
      return this.state.announcements
        .filter(announcement => announcement.title.includes(this.state.value))
        .map(function(currentAnnouncement, i) {
          return <Announcement announcement={currentAnnouncement} key={i} />;
        })
        .reverse();
    }
  }

  render() {
    return (
      <div style={{ marginTop: "5em" }}>
        <Grid padded="vertically" columns={3}>
          <GridColumn width="3">
            <Menu
              vertical
              style={({ marginTop: "5em" }, { marginLeft: "5em" })}
            >
              {this.props.auth.isAuthenticated ? (
                <Menu.Item onClick={() => this.buttonAnnouncementAdd()}>
                  {this.state.announcementAddVisible
                    ? "Hide Adding Announcement"
                    : "Add Announcement"}
                </Menu.Item>
              ) : (
                ""
              )}
              <Menu.Item>
                <Input
                  placeholder="Search..."
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </Menu.Item>
              <Menu.Item onClick={() => this.searchFilterFun()}>
                Search Mode
              </Menu.Item>
              <Menu.Item onClick={() => this.noFilterFun()}>Normal</Menu.Item>
              <Menu.Item onClick={() => this.reverseFilterFun()}>
                From the Oldest
              </Menu.Item>
            </Menu>
          </GridColumn>

          <GridColumn width="10">
            <Header inverted as="h3" dividing>
              Announcements
            </Header>
            {this.props.auth.isAuthenticated ? (
              this.state.announcementAddVisible ? (
                <AnnouncementAdd
                  getAllAnnouncements={this.getAllAnnouncements}
                />
              ) : null
            ) : (
              ""
            )}
            ,{this.announcementsList()}
          </GridColumn>
          <GridColumn width="2" />
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
