import React, { Component } from "react";
import logo2 from "./images/one.jpg";
import Announcement from "./Announcement";
import SubMenu from "./SubMenu";
import { Grid, GridRow, Menu, Sticky, Segment, Rail } from "semantic-ui-react";

class HomePage extends Component {
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
            <Sticky>
              <SubMenu />
            </Sticky>
          </Grid.Column>
          <Grid.Column width="10" floated="right">
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
          </Grid.Column>
          <Grid.Column width="2" />
        </Grid>
      </div>
    );
  }
}

export default HomePage;
