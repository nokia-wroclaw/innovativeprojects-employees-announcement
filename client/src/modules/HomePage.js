import React, { Component } from "react";
import "./HomePage.css";
//import Announcement from "./Announcement";
import SearchBar from "./SearchBar";
import { Grid, Segment, Feed } from "semantic-ui-react";
import axios from "axios";

const Announcement = props => (
  <Segment>
    <Feed>
      <Feed.Event>
        <Feed.Label image="/images/avatar/small/laura.jpg" />
        {props.announcement.user_id}
      </Feed.Event>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary className="summary">
            {props.announcement.title}
          </Feed.Summary>
          <Feed.Extra text>{props.announcement.description}</Feed.Extra>
          <Feed.Extra text>
            <p>Price:</p>
            {props.announcement.price}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  </Segment>
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { announcements: [], currentPage: 1, announcementsPerPage: 3 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ currentPage: Number(event.target.id) });
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

  // announcementsList() {
  //   for (let i = 0; i < 5; i++)
  //     return this.state.announcements.map(function(currentAnnouncement, i) {
  //       return <Announcement announcement={currentAnnouncement} key={i} />;
  //     });
  // }

  announcementsList() {
    return this.state.announcements.map(function(currentAnnouncement, i) {
      return <Announcement announcement={currentAnnouncement} key={i} />;
    });
  }

  render() {
    const { announcements, currentPage, announcementsPerPage } = this.state;
    return (
      <div>
        <Grid padded="vertically" columns={3}>
          <Grid.Column floated="right" width="2">
            <div className="fixed">
              <SearchBar />
            </div>
          </Grid.Column>
          <Grid.Column width="8" floated="right">
            {this.announcementsList()}
          </Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </div>
    );
  }
}

export default HomePage;
