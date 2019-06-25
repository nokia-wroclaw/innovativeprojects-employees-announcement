import React, { Component } from "react";
import axios from "axios";

import {
  List,
  Header,
  Grid,
  GridRow,
  Segment,
  GridColumn
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
      .get(`/api/users/acc/${params.UserEmail}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Grid textAlign="center" style={{ marginTop: "5.5em" }}>
          <GridRow>
            <Segment style={{ height: "40vh", width: "100vh" }}>
              <Header as="h1">User info</Header>
              <Grid columns="4">
                <GridColumn width="6">
                  <img
                    alt="avatar"
                    src={this.state.user.image}
                    style={{ maxHeight: "200px" }}
                  />
                </GridColumn>
                <GridColumn width="1">
                  <List size="massive">
                    <List.Item icon="user" />
                    <List.Item icon="user" />
                    <List.Item icon="mail" />
                  </List>
                </GridColumn>
                <GridColumn width="4" textAlign="left">
                  <List size="massive">
                    <List.Item content={"First Name: "} />
                    <List.Item content={"Last Name: "} />
                    <List.Item content={"Email: "} />
                  </List>
                </GridColumn>
                <GridColumn textAlign="left">
                  <List size="massive">
                    <List.Item content={this.state.user.firstName} />
                    <List.Item content={this.state.user.lastName} />
                    <List.Item content={this.state.user.email} />
                  </List>
                </GridColumn>
              </Grid>
            </Segment>
          </GridRow>

          {/* <GridRow>
            <Form noValidate onSubmit={this.onSubmit}>
              <Segment stacked style={{ height: "400px", width: "800px" }} />
            </Form>
          </GridRow> */}
        </Grid>
      </div>
    );
  }
}

export default AccountView;
