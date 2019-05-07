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

class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`/api/users/acc/${params.UserEmail}@nokia.com`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={({ height: "100%" }, { marginTop: "5.5em" })}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 850 }}>
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked style={{ height: "400px", width: "800px" }}>
                <Header as="h2" color="blue" textAlign="center">
                  User info
                </Header>
                <List>
                  <List.Item icon="user" content={this.state.user.firstName} />
                  <List.Item icon="user" content={this.state.user.lastName} />
                  <List.Item icon="mail" content={this.state.user.email} />
                </List>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AccountView;
