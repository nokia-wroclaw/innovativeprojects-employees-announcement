import React, { Component } from "react";
import "./HomePage.css";
import logo2 from "./images/one.jpg";
import Announcement from "./Announcement";
import SearchBar from "./SearchBar";
import { Grid } from "semantic-ui-react";

class HomePage extends Component {
  GoToAuthorHandler() {
    console.log("Hello");
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
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
          </Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </div>
    );
  }
}

export default HomePage;
