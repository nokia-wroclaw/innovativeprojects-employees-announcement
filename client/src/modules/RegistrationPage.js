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
      errors: {},
      first_nameErrorEmpty: "",
      last_nameErrorEmpty: "",
      emailErrorEmpty: "",
      emailErrorDomain: "",
      passwordErrorEmpty: "",
      passwordErrorLength: "",
      passwordConfirmationErrorEmpty: "",
      passwordConfirmationErrorMatch: ""
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

  validate = () => {
    let isError = false;
    const errors = {
      first_nameErrorEmpty: "",
      last_nameErrorEmpty: "",
      emailErrorEmpty: "",
      emailErrorDomain: "",
      passwordErrorEmpty: "",
      passwordErrorLength: "",
      passwordConfirmationErrorEmpty: "",
      passwordConfirmationErrorMatch: ""
    };
    if (this.state.first_name.trim() === "") {
      isError = true;
      errors.first_nameErrorEmpty = "First name cannot be empty";
    }

    if (this.state.last_name.trim() === "") {
      isError = true;
      errors.last_nameErrorEmpty = "Last name cannot be empty";
    }

    if (this.state.email.trim() === "") {
      isError = true;
      errors.emailErrorEmpty = "Email cannot be empty";
    }

    var emailRegex = /^[a-zA-Z0-9_.+-]+@nokia\.com$/;

    if (!emailRegex.test(this.state.email)) {
      isError = true;
      errors.emailErrorDomain =
        "Email needs to be from nokia domain, eg. example@nokia.com";
    }

    if (this.state.password.trim() === "") {
      isError = true;
      errors.passwordErrorEmpty = "Password cannot be empty";
    }

    if (this.state.password.length < 7) {
      isError = true;
      errors.passwordErrorLength = "Password must have at least 6 characters ";
    }

    if (this.state.passwordConfirmation.trim() === "") {
      isError = true;
      errors.passwordConfirmationErrorEmpty =
        "Password confirmation cannot be empty";
    }

    if (this.state.password !== this.state.passwordConfirmation) {
      isError = true;
      errors.passwordConfirmationErrorMatch =
        "Password and Password Confirmation must match";
    }

    if (isError) {
      this.setState(errors);
    }

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();

    const err = this.validate();

    if (!err) {
      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: {},
        first_nameErrorEmpty: "",
        last_nameErrorEmpty: "",
        emailErrorEmpty: "",
        emailErrorDomain: "",
        passwordErrorEmpty: "",
        passwordErrorLength: "",
        passwordConfirmationErrorEmpty: "",
        passwordConfirmationErrorMatch: ""
      });

      const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      };

      this.props.registerUser(newUser, this.props.history);
    }
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
                <span class="errorsColor">
                  {this.state.first_nameErrorEmpty}
                </span>
                <Form.Input
                  id="first_name"
                  name="first_name"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                  error={this.state.first_nameErrorEmpty}
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
                <span class="errorsColor">
                  {this.state.last_nameErrorEmpty}
                </span>
                <Form.Input
                  id="last_name"
                  name="last_name"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last Name"
                  error={this.state.last_nameErrorEmpty}
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
                <span class="errorsColor">{this.state.emailErrorEmpty}</span>
                <div>
                  <span class="errorsColor">{this.state.emailErrorDomain}</span>
                </div>
                <Form.Input
                  id="email"
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  error={
                    this.state.emailErrorEmpty || this.state.emailErrorDomain
                  }
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <span class="errorsColor">{this.state.passwordErrorEmpty}</span>
                <div>
                  <span class="errorsColor">
                    {this.state.passwordErrorLength}
                  </span>
                </div>
                <Form.Input
                  id="password"
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  error={
                    this.state.passwordErrorEmpty ||
                    this.state.passwordErrorLength
                  }
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <span class="errorsColor">
                  {this.state.passwordConfirmationErrorEmpty}
                </span>
                <div>
                  <span class="errorsColor">
                    {this.state.passwordConfirmationErrorMatch}
                  </span>
                </div>
                <Form.Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password Confrimation"
                  type="password"
                  error={
                    this.state.passwordConfirmationErrorEmpty ||
                    this.state.passwordConfirmationErrorMatch
                  }
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
