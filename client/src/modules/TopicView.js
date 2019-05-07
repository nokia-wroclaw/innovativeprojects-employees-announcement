import React, { Component } from "react";
import axios from "axios";

import {
  List,
  Message,
  Button,
  Form,
  Header,
  Grid,
  GridRow,
  Menu,
  Sticky,
  Segment,
  Rail,
  GridColumn,
  Feed
} from "semantic-ui-react";

class TopicView extends Component {
  constructor(props) {
    super(props);
    this.state = { topic: {}, user: {} };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`/api/topics/${params.TopicId}`)
      .then(response => {
        this.setState({ topic: response.data });
        return axios.get(`/api/users/${response.data.user_id}`);
      })
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    var acc = new String(this.state.user.email);
    var date =
      new Date(this.state.topic.date_of_add).toLocaleTimeString() +
      ", " +
      new Date(this.state.topic.date_of_add).toLocaleDateString();
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={({ height: "100%" }, { marginTop: "5.5em" })}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 850 }}>
            <Segment>
              <Feed>
                <Feed.Event>
                  <Feed.Label /*image="./images/nokia.png" */ />
                  <Feed.Content>
                    <Feed.Date>
                      Added by {this.state.user.firstName}{" "}
                      {this.state.user.lastName}{" "}
                      <a href={"/account-view/" + acc}>
                        ({this.state.user.email})
                      </a>{" "}
                      at {date}
                    </Feed.Date>
                    <Feed.Summary>{this.state.topic.title}</Feed.Summary>

                    <Feed.Extra style={{ width: "90%" }}>
                      {this.state.topic.description}
                    </Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default TopicView;
