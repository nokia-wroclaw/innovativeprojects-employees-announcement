import React, { Component } from "react";
import { Image, List, Segment, Container } from "semantic-ui-react";
import logo from "./images/logoNowe.png";

class Footer extends Component {
  render() {
    return (
      <div>
        <Segment inverted attached>
          <Container textAlign="center">
            <div>Employees Announcements</div>

            <List horizontal inverted divided link size="small">
              <List.Item as="a">Dawid Białek</List.Item>
              <List.Item as="a">Kamil Śliwa</List.Item>
              <List.Item as="a">Szymon Bal</List.Item>
              <List.Item as="a">Łukasz Gil</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;
