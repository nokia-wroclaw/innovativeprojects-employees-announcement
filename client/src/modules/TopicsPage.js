import React, { Component } from "react";

import { Grid, Button, Header, Input, Icon, Segment } from "semantic-ui-react";

import axios from "axios";
import TopicAdd from "./TopicAdd";
import Topic from "./Topic";

import TopicViewOnSide from "./TopicViewOnSide";

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
      topicAddVisible: false,
      renderTopicOnSide: false,
      choosenTopicId: null
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

  topicDelete = id => {
    this.setState({
      topics: this.state.topics.filter(function(topic) {
        return topic._id !== id;
      })
    });
  };

  componentDidMount() {
    this.getAllTopics(this.topics);
    this.setState({ search: "" });
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  topicChoose = id => {
    this.setState({ choosenTopicId: id });

    this.setState({ renderTopicOnSide: true });
  };

  topicsList() {
    const { search } = this.state;
    let self = this;
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
          return (
            <Topic
              topicChoose={self.topicChoose}
              topicDelete={self.topicDelete}
              topic={currentTopic}
              key={i}
            />
          );
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
          <Grid.Column width="1" />
          <Grid.Column width="7">
            <Header inverted as="h3" dividing>
              Topics
            </Header>
            {this.props.auth.isAuthenticated ? (
              <Button
                icon
                size="tiny"
                floated="left"
                onClick={() => this.buttonTopicAdd()}
              >
                {this.state.topicAddVisible ? (
                  <Icon name="minus" />
                ) : (
                  <Icon name="plus" />
                )}
              </Button>
            ) : (
              ""
            )}
            {this.props.auth.isAuthenticated ? (
              this.state.topicAddVisible ? (
                <TopicAdd getAllTopics={this.getAllTopics} />
              ) : null
            ) : (
              ""
            )}
            <span>
              {" "}
              <small>.</small>
            </span>
            {this.topicsList()}{" "}
          </Grid.Column>
          <Grid.Column width="7">
            {this.state.renderTopicOnSide ? (
              <TopicViewOnSide TopicId={this.state.choosenTopicId} />
            ) : null}
          </Grid.Column>
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
