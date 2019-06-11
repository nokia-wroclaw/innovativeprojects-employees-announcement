import React, { Component } from "react";

import {
  Grid,
  GridColumn,
  Button,
  Header,
  Input,
  Icon
} from "semantic-ui-react";

import axios from "axios";
import AnnouncementAdd from "./AnnouncementAdd";
import Announcement from "./Announcement";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class HomePage extends Component {
  state = {
    search: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      announcementAddVisible: false
    };
    this.getAllAnnouncements = this.getAllAnnouncements.bind(this);
    this.announcementsList = this.announcementsList.bind(this);
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
    this.setState({ search: "" });
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  announcementsList = e => {
    const { search } = this.state;
    return this.state.announcements
      .map(function(currentAnnouncement, i) {
        if (
          currentAnnouncement.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          currentAnnouncement.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          currentAnnouncement.price
            .toString()
            .includes(search.toLocaleLowerCase())
        )
          return <Announcement announcement={currentAnnouncement} key={i} />;
      })
      .reverse(); // ale przy odwrotnej kolejnosci jest skok(opoznienie minimalne), nie wazne, naprawione tym ze reverse() ma byc po funkcji map a nie przed
  };

  onChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div style={{ marginTop: "5em" }}>
        <Grid padded="vertically" columns={3}>
          <GridColumn width="3" />

          <GridColumn width="10">
            <Header inverted as="h3" dividing>
              Announcements
            </Header>
            {this.props.auth.isAuthenticated ? (
              <Button
                icon
                size="tiny"
                floated="left"
                onClick={() => this.buttonAnnouncementAdd()}
              >
                {this.state.announcementAddVisible ? (
                  <Icon name="minus" />
                ) : (
                  <Icon name="plus" />
                )}
              </Button>
            ) : (
              ""
            )}
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
