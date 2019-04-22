import React, { Component } from "react";
import "./HomePage.css";
import logo2 from "./images/one.jpg";
//import Announcement from "./Announcement";
import SearchBar from "./SearchBar";
import { Grid, Segment, Feed } from "semantic-ui-react";
import axios from "axios";

const Announcement = props => (
  <Segment>
    <Feed>
      <Feed.Event>
        <Feed.Label image="/images/avatar/small/laura.jpg" />
        <Feed.Content>
          <Feed.Summary>{props.announcement.title}</Feed.Summary>
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
      <div
        style={{
          backgroundImage: `url(${logo2})`,
          height: "100%",
          width: "100%"
        }}
      >
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
