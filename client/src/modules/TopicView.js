import React, { Component } from "react";
import axios from "axios";

import { Header, Grid, Segment, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ReactTimeAgo from "react-time-ago/tooltip";

import "react-time-ago/Tooltip.css";

import "./TopicView.css";

import Comment from "./Comment";
import CommentAdd from "./CommentAdd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class TopicView extends Component {
  constructor(props) {
    super(props);
    this.state = { topic: {}, user: {}, comments: [] };
  }

  getAllComments = () => {
    axios
      .get(`/api/comments/topicID/${this.state.topic._id}`)
      .then(response => {
        this.setState({ comments: response.data });
        console.log(this.state.comments);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  commentDelete = id => {
    this.setState({
      comments: this.state.comments.filter(function(comment) {
        return comment._id !== id;
      })
    });
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`/api/topics/${params.TopicId}`)
      .then(response => {
        this.setState({
          topic: response.data,
          someTime: (
            <ReactTimeAgo
              date={new Date(response.data.date_of_add)}
              tooltipClassName="TooltipCssTopicView"
            />
          )
        });
        return axios.get(`/api/users/${response.data.user_id}`);
      })
      .then(response => {
        this.setState({ user: response.data });
        this.getAllComments(this.comments);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  commentsList() {
    let self = this;
    return this.state.comments.map(function(currentComment, i) {
      return (
        <Comment
          commentDelete={self.commentDelete}
          comment={currentComment}
          key={i}
        />
      );
    });
  }
  render() {
    var acc = new String(this.state.user.email);
    acc = acc.substring(0, acc.indexOf("@"));
    //  var date2 =
    //    new Date(this.state.topic.date_of_add).toLocaleTimeString() +
    //    ", " +
    //    new Date(this.state.topic.date_of_add).toLocaleDateString();
    //console.log(this.state.topic);
    //var date = new Date(this.state.topic.date_of_add);
    //var date = new Date();
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={({ height: "100%" }, { marginTop: "5.5em" })}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 850 }}>
            <Segment>
              <Feed style={{ marginTop: "1.5em" }}>
                <Feed.Event>
                  <Feed.Label>
                    <img src={this.state.user.image} alt="avatar" />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Date>
                      Added by {this.state.user.firstName}{" "}
                      {this.state.user.lastName}{" "}
                      <Link to={"/account-view/" + acc}>
                        {this.state.user.email}
                      </Link>{" "}
                      {this.state.someTime}
                    </Feed.Date>
                    <Feed.Summary style={{ fontSize: "20px" }}>
                      {this.state.topic.title}
                    </Feed.Summary>

                    <Feed.Extra style={{ width: "90%" }}>
                      {this.state.topic.description}
                    </Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Segment>

            <Header
              inverted
              as="h3"
              dividing
              textAlign="left"
              style={{ marginTop: "4em" }}
            >
              Comments
            </Header>

            {this.commentsList()}
            <Grid.Column style={{ marginTop: "5.5em" }}>
              {this.props.auth.isAuthenticated ? (
                <CommentAdd
                  s
                  getAllComments={this.getAllComments}
                  topic_id={this.state.topic._id}
                />
              ) : (
                ""
              )}
            </Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

TopicView.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TopicView);
