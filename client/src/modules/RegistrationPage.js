import React, { Component } from "react";

import "./RegistrationPage.css";
import { Grid, Button, Header, Form, Segment } from "semantic-ui-react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class RegistrationPage extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={({ height: "100%" }, { marginTop: "5.5em" })}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Registration
            </Header>
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked>
                <span class="errorsColor">{errors.first_name}</span>
                <Form.Input
                  id="first_name"
                  name="first_name"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                  error={errors.first_name}
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
                <span class="errorsColor">{errors.last_name}</span>
                <Form.Input
                  id="last_name"
                  name="last_name"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last Name"
                  error={errors.last_name}
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
                <span class="errorsColor">{errors.email}</span>
                <Form.Input
                  id="email"
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  error={errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <span class="errorsColor">{errors.password}</span>
                <Form.Input
                  id="password"
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  error={errors.password}
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <span class="errorsColor">{errors.passwordConfirmation}</span>
                <Form.Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password Confrimation"
                  type="password"
                  error={errors.passwordConfirmation}
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                />

                <Button color="blue" fluid size="large">
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegistrationPage));
