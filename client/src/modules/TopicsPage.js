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
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      topicAddVisible: false,
      noFilter: true,
      reverseFilter: false,
      searchTitltFilter: false,
      searchDescriptionFilter: false,
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  noFilterFun() {
    this.setState({
      noFilter: true,
      reverseFilter: false,
      searchTitleFilter: false,
      searchDescriptionFilter: false
    });
  }

  reverseFilterFun() {
    this.setState({
      noFilter: false,
      reverseFilter: true,
      searchTitleFilter: false,
      searchDescriptionFilter: false
    });
  }

  searchTitleFilterFun() {
    this.setState({
      noFilter: false,
      reverseFilter: false,
      searchTitleFilter: true,
      searchDescriptionFilter: false
    });
  }

  searchDescriptionFilterFun() {
    this.setState({
      noFilter: false,
      reverseFilter: false,
      searchTitleFilter: false,
      searchDescriptionFilter: true
    });
  }

  topicsList() {
    if (this.state.noFilter) {
      return this.state.topics

        .map(function(currentTopic, i) {
          return <Topic topic={currentTopic} key={i} />;
        })
        .reverse(); // ale przy odwrotnej kolejnosci jest skok(opoznienie minimalne), nie wazne, naprawione tym ze reverse() ma byc po funkcji map a nie przed
    }
    if (this.state.reverseFilter) {
      return this.state.topics.map(function(currentTopic, i) {
        return <Topic topic={currentTopic} key={i} />;
      });
    }

    if (this.state.searchTitleFilter) {
      return this.state.topics
        .filter(topic => topic.title.includes(this.state.value))
        .map(function(currentTopic, i) {
          return <Topic topic={currentTopic} key={i} />;
        })
        .reverse();
    }
    if (this.state.searchDescriptionFilter) {
      return this.state.topics
        .filter(topic => topic.description.includes(this.state.value))
        .map(function(currentTopic, i) {
          return <Topic topic={currentTopic} key={i} />;
        })
        .reverse();
    }
  }
  render() {
    return (
      <div style={{ marginTop: "5em" }}>
        <Grid padded="vertically" columns={3}>
          <Grid.Column width="3">
            <Menu
              vertical
              style={({ marginTop: "5em" }, { marginLeft: "5em" })}
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
              <Menu.Item>
                <Input
                  placeholder="Search..."
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </Menu.Item>
              <Menu.Item onClick={() => this.searchTitleFilterFun()}>
                Search Title Mode
              </Menu.Item>
              <Menu.Item onClick={() => this.searchDescriptionFilterFun()}>
                Search Description Mode
              </Menu.Item>
              <Menu.Item onClick={() => this.noFilterFun()}>Normal</Menu.Item>
              <Menu.Item onClick={() => this.reverseFilterFun()}>
                From the Oldest
              </Menu.Item>
            </Menu>
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
