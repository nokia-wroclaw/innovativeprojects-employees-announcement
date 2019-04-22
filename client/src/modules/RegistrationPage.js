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
      firstName: "", //na camelCase
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {},
      firstNameErrorEmpty: "", //trzymajcie się jednego stylu - powinno być firstNameErrorEmpty
      firstNameErrorWhitespaces: "",
      lasttNameErrorEmpty: "",
      lasttNameErrorWhitespaces: "",
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

  //do usunięcia
  //  onChange = e => {
  //    this.setState({ [e.target.id]: e.target.value });
  //  };

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
      lasttNameErrorEmpty:
        lastName.trim() === "" ? "Last name cannot be empty" : "",
      lasttNameErrorWhitespaces: /\s/.test(lastName)
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
      emailErrorDomain: !/^[a-zA-Z0-9_.+-]+@nokia\.com$/.test(email)
        ? "Email needs to be from nokia domain, eg. example@nokia.com"
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

  // validate = () => {
  //   let isError = false;
  //   const errors = {
  //     firstNameErrorEmpty: "",
  //     firstNameErrorWhitespaces: "",
  //     lasttNameErrorEmpty: "",
  //     lasttNameErrorWhitespaces: "",
  //     emailErrorEmpty: "",
  //     emailErrorDomain: "",
  //     emailErrorWhitespaces: "",
  //     passwordErrorEmpty: "",
  //     passwordErrorLength: "",
  //     passwordErrorWhitespaces: "",
  //     passwordConfirmationErrorEmpty: "",
  //     passwordConfirmationErrorMatch: "",
  //     passwordConfirmationErrorWhitespaces: ""
  //   };
  //   if (this.state.firstName.trim() === "") {
  //     isError = true;
  //     errors.firstNameErrorEmpty = "First name cannot be empty";
  //   }
  //
  //   if (/\s/.test(this.state.firstName)) {
  //     // \s is regex for whitespaces
  //     isError = true;
  //     errors.firstNameErrorWhitespaces =
  //       "First name cannot contain whitespaces";
  //   }
  //
  //   if (this.state.lastName.trim() === "") {
  //     isError = true;
  //     errors.lasttNameErrorEmpty = "Last name cannot be empty";
  //   }
  //
  //   if (/\s/.test(this.state.lastName)) {
  //     isError = true;
  //     errors.lasttNameErrorWhitespaces = "Last name cannot contain whitespaces";
  //   }
  //
  //   if (this.state.email.trim() === "") {
  //     isError = true;
  //     errors.emailErrorEmpty = "Email cannot be empty";
  //   }
  //
  //   if (/\s/.test(this.state.email)) {
  //     isError = true;
  //     errors.emailErrorWhitespaces = "Email cannot contain whitespaces";
  //   }
  //
  //   var emailRegex = /^[a-zA-Z0-9_.+-]+@nokia\.com$/;
  //
  //   if (!emailRegex.test(this.state.email)) {
  //     isError = true;
  //     errors.emailErrorDomain =
  //       "Email needs to be from nokia domain, eg. example@nokia.com";
  //   }
  //
  //   if (this.state.password.trim() === "") {
  //     isError = true;
  //     errors.passwordErrorEmpty = "Password cannot be empty";
  //   }
  //
  //   if (/\s/.test(this.state.password)) {
  //     isError = true;
  //     errors.passwordErrorWhitespaces = "Password cannot contain whitespaces";
  //   }
  //
  //   if (this.state.password.length < 6) {
  //     isError = true;
  //     errors.passwordErrorLength = "Password must have at least 6 characters ";
  //   }
  //
  //   if (this.state.passwordConfirmation.trim() === "") {
  //     isError = true;
  //     errors.passwordConfirmationErrorEmpty =
  //       "Password Confirmation cannot be empty";
  //   }
  //
  //   if (/\s/.test(this.state.passwordConfirmation)) {
  //     isError = true;
  //     errors.passwordConfirmationErrorWhitespaces =
  //       "Password Confirmation cannot contain whitespaces";
  //   }
  //
  //   if (this.state.password !== this.state.passwordConfirmation) {
  //     isError = true;
  //     errors.passwordConfirmationErrorMatch =
  //       "Password and Password Confirmation must match";
  //   }
  //
  //   if (isError) {
  //     this.setState(errors);
  //   }
  //
  //
  //   return isError;
  // };

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
      /* ogólnie ta zmiana stanu nie będzie potrzebna - wszystko pójdzie w real timie*/
      this.setState({
        /*firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "", <-- to jest niepotrzebne - powoduje utratę danych (przypadek z tym samym e-mailem),
        to jednak nie było związane z dispatcherem ;C*/
        errors: {},
        firstNameErrorEmpty: "",
        firstNameErrorWhitespaces: "",
        lasttNameErrorEmpty: "",
        lasttNameErrorWhitespaces: "",
        emailErrorEmpty: "",
        emailErrorDomain: "",
        emailErrorWhitespaces: "",
        passwordErrorEmpty: "",
        passwordErrorLength: "",
        passwordErrorWhitespaces: "",
        passwordConfirmationErrorEmpty: "",
        passwordConfirmationErrorMatch: "",
        passwordConfirmationErrorWhitespaces: ""
      });

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
            <Header as="h2" color="blue" textAlign="center">
              Registration
            </Header>
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked>
                <div>
                  {/*class to invalid property, powinno być className*/}
                  <span class="errorsColor">
                    {this.state.firstNameErrorEmpty}
                  </span>
                </div>
                <div>
                  <span class="errorsColor">
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
                  <span class="errorsColor">
                    {this.state.lasttNameErrorEmpty}
                  </span>
                </div>
                <div>
                  <span class="errorsColor">
                    {this.state.lasttNameErrorWhitespaces}
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
                    this.state.lasttNameErrorEmpty ||
                    this.state.lasttNameErrorWhitespaces
                  }
                  value={this.state.lastName}
                  onChange={e =>
                    this.updateInput(e, this.getLastNameErrorMessages)
                  }
                />
                <div>
                  <span class="errorsColor">{this.state.emailErrorEmpty}</span>
                </div>
                <div>
                  <span class="errorsColor">
                    {this.state.emailErrorWhitespaces}
                  </span>
                </div>
                <div>
                  <span class="errorsColor">{this.state.emailErrorDomain}</span>
                </div>
                <div>
                  <span class="errorsColor">{errors.email}</span>
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
                  <span class="errorsColor">
                    {this.state.passwordErrorEmpty}
                  </span>
                </div>

                <div>
                  <span class="errorsColor">
                    {this.state.passwordErrorWhitespaces}
                  </span>
                </div>

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
                    this.state.passwordErrorLength ||
                    this.state.passwordErrorWhitespaces
                  }
                  value={this.state.password}
                  onChange={e =>
                    this.updateInput(e, this.getPasswordErrorMessages)
                  }
                />
                <div>
                  <span class="errorsColor">
                    {this.state.passwordConfirmationErrorEmpty}
                  </span>
                </div>
                <div>
                  <span class="errorsColor">
                    {this.state.passwordConfirmationErrorWhitespaces}
                  </span>
                </div>
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
