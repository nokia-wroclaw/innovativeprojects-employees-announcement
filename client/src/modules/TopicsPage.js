import React, { Component } from "react";

import {
  Grid,
  Button,
  GridRow,
  Header,
  Input,
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
  state = {
    search: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      topicAddVisible: false
    };
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
    this.state.search = "";
  }

  topicsList() {
    const { search } = this.state;
    return this.state.topics
      .map(function(currentTopic, i) {
        if (
          currentTopic.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          currentTopic.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
          return <Topic topic={currentTopic} key={i} />;
      })
      .reverse(); // ale przy odwrotnej kolejnosci jest skok(opoznienie minimalne), nie wazne, naprawione tym ze reverse() ma byc po funkcji map a nie przed
  }

  onChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div style={{ marginTop: "5em" }}>
        <Grid padded="vertically" columns={3}>
          <Grid.Column width="3">
            <Menu
              vertical
              style={({ marginTop: "5em" }, { marginLeft: "4em" })}
            >
              {this.props.auth.isAuthenticated ? (
                <Menu.Item onClick={() => this.buttonTopicAdd()}>
                  {this.state.announcementAddVisible
                    ? "Hide Adding Topic"
                    : "Add Topic"}
                </Menu.Item>
              ) : (
                ""
              )}
            </Menu>
            <Input label="Search" icon="search" onChange={this.onChange} />
          </Grid.Column>
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
