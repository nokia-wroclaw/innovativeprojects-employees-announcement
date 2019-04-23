import React, { Component } from "react";
import logo2 from "./images/one.jpg";

import SubMenu from "./SubMenu";
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

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Announcement = props => (
  <Segment>
    <Feed>
      <Feed.Event>
        <Feed.Label image="/images/avatar/small/laura.jpg" />
        <Feed.Content>
          <Feed.Summary>{props.announcement.title}</Feed.Summary>
          <Feed.Extra text>
            <p>Price:</p>
            {props.announcement.price}
          </Feed.Extra>
          <Feed.Extra text>{props.announcement.description}</Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  </Segment>
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { announcements: [] };
  }

  componentDidMount() {
    axios
      .get("/api/announcements/")
      .then(response => {
        this.setState({ announcements: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  announcementsList() {
    return this.state.announcements.map(function(currentAnnouncement, i) {
      return <Announcement announcement={currentAnnouncement} key={i} />;
    });
  }
  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated ? <AnnouncementAdd /> : ""}

        <Grid padded="vertically" columns={3}>
          <Grid.Column floated="right" width="2">
            <Sticky>
              <SubMenu />
            </Sticky>
          </Grid.Column>
          <Grid.Column width="10" floated="right">
            {this.announcementsList()}
          </Grid.Column>
          <Grid.Column width="2" />
        </Grid>
      </div>

      // <div>
      //           <h3>Todos List</h3>
      //           <table className="table table-striped" style={{ marginTop: 20 }}>
      //               <thead>
      //                   <tr>
      //                       <th>Title</th>
      //                       <th>description</th>
      //                       <th>Price</th>

      //                   </tr>
      //               </thead>
      //               <tbody>
      //                   { this.announcementsList() }
      //               </tbody>
      //           </table>
      //       </div>
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
