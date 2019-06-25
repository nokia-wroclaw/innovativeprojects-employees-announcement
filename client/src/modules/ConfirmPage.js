import React, { Component } from "react";
import axios from "axios";

import { Header, Grid, GridRow, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    axios
      .post(`/api/users/emailconfirmation/${params.token}`)
      .then(response => {})
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <Grid textAlign="center" style={{ marginTop: "5.5em" }}>
        <GridRow>
          <Segment style={{ height: "20vh", width: "100vh" }}>
            <Header as="h1">Thank you</Header>
            <div>Your account has been confirmed. Now you can login.</div>
            <Header as="h2">
              <Link to="/login">Login here</Link>
            </Header>
          </Segment>
        </GridRow>
      </Grid>
    );
  }
}
export default ConfirmPage;
