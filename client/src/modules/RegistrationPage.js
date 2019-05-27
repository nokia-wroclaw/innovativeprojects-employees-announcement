import React, { Component } from "react";

import "./RegistrationPage.css";
import {
  Grid,
  Button,
  Header,
  Form,
  Segment,
  Message
} from "semantic-ui-react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class RegistrationPage extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {},
      firstNameErrorEmpty: "",
      firstNameErrorWhitespaces: "",
      lastNameErrorEmpty: "",
      lastNameErrorWhitespaces: "",
      emailErrorEmpty: "",
      emailErrorDomain: "",
      emailErrorWhitespaces: "",
      passwordErrorEmpty: "",
      passwordErrorLength: "",
      passwordErrorWhitespaces: "",
      passwordConfirmationErrorEmpty: "",
      passwordConfirmationErrorMatch: "",
      passwordConfirmationErrorWhitespaces: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  //zamiast onChange
  updateInput = (e, getErrorMessages) => {
    this.setState({
      ...getErrorMessages(e.target.value),
      [e.target.id]: e.target.value
    });
  };

  //każdy input powinien mieć własną walidację
  getFirstNameErrorMessages = firstName => {
    return {
      firstNameErrorEmpty:
        firstName.trim() === "" ? "First name cannot be empty" : "",
      firstNameErrorWhitespaces: /\s/.test(firstName)
        ? "First name cannot contain whitespaces"
        : ""
    };
  };

  getLastNameErrorMessages = lastName => {
    return {
      lastNameErrorEmpty:
        lastName.trim() === "" ? "Last name cannot be empty" : "",
      lastNameErrorWhitespaces: /\s/.test(lastName)
        ? "Last name cannot contain whitespaces"
        : ""
    };
  };

  getEmailErrorMessages = email => {
    return {
      emailErrorEmpty: email.trim() === "" ? "Email cannot be empty" : "",
      emailErrorWhitespaces: /\s/.test(email)
        ? "Email cannot contain whitespaces"
        : "",
      emailErrorDomain: !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      )
        ? "Email needs to be valid"
        : ""
    };
  };

  getPasswordErrorMessages = password => {
    return {
      passwordErrorEmpty:
        password.trim() === "" ? "Password cannot be empty" : "",
      passwordErrorWhitespaces: /\s/.test(password)
        ? "Password cannot contain whitespaces"
        : "",
      passwordErrorLength:
        password.length < 6 ? "Password must have at least 6 characters " : ""
    };
  };

  getPasswordConfirmationErrorMessages = passwordConfirmation => {
    return {
      passwordConfirmationErrorEmpty:
        passwordConfirmation.trim() === ""
          ? "Password confirmation cannot be empty"
          : "",
      passwordConfirmationErrorWhitespaces: /\s/.test(passwordConfirmation)
        ? "Password confirmation cannot contain whitespaces"
        : "",
      passwordConfirmationErrorMatch:
        this.state.password !== passwordConfirmation
          ? "Password and Password Confirmation must match"
          : ""
    };
  };

  onSubmit = e => {
    e.preventDefault();

    //todo do dokończenia
    const errors = {
      ...this.getFirstNameErrorMessages(this.state.firstName),
      ...this.getLastNameErrorMessages(this.state.lastName),
      ...this.getEmailErrorMessages(this.state.email),
      ...this.getPasswordErrorMessages(this.state.password),
      ...this.getPasswordConfirmationErrorMessages(
        this.state.passwordConfirmation
      )
    };

    const hasErrors = Object.values(errors).some(message => message !== "");

    if (!hasErrors) {
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      };

      this.props.registerUser(newUser, this.props.history);
    } else {
      this.setState(errors);
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
            <Message>
              <Header as="h3" color="blue" textAlign="center">
                Registration
              </Header>
            </Message>
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked>
                <div>
                  <span className="errorsColor">
                    {this.state.firstNameErrorEmpty}
                  </span>
                </div>
                <div>
                  <span className="errorsColor">
                    {this.state.firstNameErrorWhitespaces}
                  </span>
                </div>
                <Form.Input
                  id="firstName"
                  name="firstName"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                  error={
                    this.state.firstNameErrorEmpty ||
                    this.state.firstNameErrorWhitespaces
                  }
                  value={this.state.firstName}
                  onChange={e =>
                    this.updateInput(e, this.getFirstNameErrorMessages)
                  }
                />
                <div>
                  <span className="errorsColor">
                    {this.state.lastNameErrorEmpty}
                  </span>
                </div>
                <div>
                  <span className="errorsColor">
                    {this.state.lastNameErrorWhitespaces}
                  </span>
                </div>
                <Form.Input
                  id="lastName"
                  name="lastName"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last Name"
                  error={
                    this.state.lastNameErrorEmpty ||
                    this.state.lastNameErrorWhitespaces
                  }
                  value={this.state.lastName}
                  onChange={e =>
                    this.updateInput(e, this.getLastNameErrorMessages)
                  }
                />
                <div>
                  <span className="errorsColor">
                    {this.state.emailErrorEmpty}
                  </span>
                </div>
                <div>
                  <span className="errorsColor">
                    {this.state.emailErrorWhitespaces}
                  </span>
                </div>
                <div>
                  <span className="errorsColor">
                    {this.state.emailErrorDomain}
                  </span>
                </div>
                <div>
                  <span className="errorsColor">{errors.email}</span>
                </div>
                <Form.Input
                  id="email"
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  error={
                    this.state.emailErrorEmpty ||
                    this.state.emailErrorDomain ||
                    this.state.emailErrorWhitespaces ||
                    errors.email
                  }
                  value={this.state.email}
                  onChange={e =>
                    this.updateInput(e, this.getEmailErrorMessages)
                  }
                />

                <div>
                  <span className="errorsColor">
                    {this.state.passwordErrorEmpty}
                  </span>
                </div>

                <div>
                  <span className="errorsColor">
                    {this.state.passwordErrorWhitespaces}
                  </span>
                </div>

                <div>
                  <span className="errorsColor">
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
                    this.state.passwordErrorLength ||
                    this.state.passwordErrorWhitespaces
                  }
                  value={this.state.password}
                  onChange={e =>
                    this.updateInput(e, this.getPasswordErrorMessages)
                  }
                />
                <div>
                  <span className="errorsColor">
                    {this.state.passwordConfirmationErrorEmpty}
                  </span>
                </div>
                <div>
                  <span className="errorsColor">
                    {this.state.passwordConfirmationErrorWhitespaces}
                  </span>
                </div>
                <div>
                  <span className="errorsColor">
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
                    this.state.passwordConfirmationErrorMatch ||
                    this.state.passwordConfirmationErrorWhitespaces
                  }
                  value={this.state.passwordConfirmation}
                  onChange={e =>
                    this.updateInput(
                      e,
                      this.getPasswordConfirmationErrorMessages
                    )
                  }
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
