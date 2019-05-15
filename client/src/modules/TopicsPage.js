import React, { Component } from "react";

import {
  Grid,
  Button,
  GridRow,
  Header,
  Menu,
  Sticky,
  Segment,
  Rail,
  GridColumn,
  Feed
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import TopicAdd from "./TopicAdd";
import Topic from "./Topic";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = { topics: [], topicAddVisible: false };
  }

  getAllTopics = () => {
    axios
      .get("/api/topics/")
      .then(response => {
        this.setState({ topics: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  buttonTopicAdd() {
    this.setState({ topicAddVisible: !this.state.topicAddVisible });
  }

  componentDidMount() {
    this.getAllTopics(this.topics);
  }

  topicsList() {
    return this.state.topics

      .map(function(currentTopic, i) {
        return <Topic topic={currentTopic} key={i} />;
      })
      .reverse(); // ale przy odwrotnej kolejnosci jest skok(opoznienie minimalne), nie wazne, naprawione tym ze reverse() ma byc po funkcji map a nie przed
  }
  render() {
    return (
      <div style={{ marginTop: "5em" }}>
        {this.props.auth.isAuthenticated ? (
          <Button
            style={{ marginRight: "110em" }}
            color="linkedin"
            onClick={() => this.buttonTopicAdd()}
          >
            {this.state.topicAddVisible ? "Hide Adding Topic" : "Add Topic"}
          </Button>
        ) : (
          ""
        )}
        <Grid padded="vertically" columns={3}>
          <Grid.Column width="3" />
          <Grid.Column width="10">
            <Header inverted as="h3" dividing>
              Topics
            </Header>
            {this.props.auth.isAuthenticated ? (
              this.state.topicAddVisible ? (
                <TopicAdd getAllTopics={this.getAllTopics} />
              ) : null
            ) : (
              ""
            )}
            ,{this.topicsList()}{" "}
          </Grid.Column>
          <Grid.Column width="2" />
        </Grid>
      </div>
    );
  }
}

TopicPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TopicPage);
