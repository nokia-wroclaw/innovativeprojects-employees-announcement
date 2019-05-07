import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import "./LoginPage.css";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      emailErrorEmpty: "",
      emailErrorWhitespaces: "",
      passwordErrorEmpty: "",
      passwordErrorWhitespaces: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to homepage when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  updateInput = (e, getErrorMessages) => {
    this.setState({
      ...getErrorMessages(e.target.value),
      [e.target.id]: e.target.value
    });
  };

  getEmailErrorMessages = email => {
    return {
      emailErrorEmpty: email.trim() === "" ? "Email cannot be empty" : "",
      emailErrorWhitespaces: /\s/.test(email)
        ? "Email cannot contain whitespaces"
        : ""
    };
  };

  getPasswordErrorMessages = password => {
    return {
      passwordErrorEmpty:
        password.trim() === "" ? "Password cannot be empty" : "",
      passwordErrorWhitespaces: /\s/.test(password)
        ? "Password cannot contain whitespaces"
        : ""
    };
  };

  onSubmit = e => {
    e.preventDefault();

    const errors = {
      ...this.getEmailErrorMessages(this.state.email),
      ...this.getPasswordErrorMessages(this.state.password)
    };

    const hasErrors = Object.values(errors).some(message => message !== "");

    if (!hasErrors) {
      this.setState({
        emailErrorEmpty: "",
        emailErrorWhitespaces: "",
        passwordErrorEmpty: "",
        passwordErrorWhitespaces: ""
      });

      const userData = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    } else {
      this.setState(errors);
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={({ height: "100%" }, { marginTop: "5.5em" })}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Message>
              <Header as="h3" color="blue" textAlign="center">
                Login to your account
              </Header>
            </Message>
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked>
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
                  <span className="errorsColor">{errors.emailnotfound}</span>
                </div>

                <Form.Input
                  error={
                    this.state.emailErrorEmpty ||
                    this.state.emailErrorWhitespaces ||
                    errors.emailnotfound
                  }
                  fluid
                  icon="mail"
                  iconPosition="left"
                  id="email"
                  name="email"
                  placeholder="E-mail address"
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
                    {errors.passwordincorrect}
                  </span>
                </div>

                <Form.Input
                  error={
                    this.state.passwordErrorEmpty ||
                    this.state.passwordErrorWhitespaces ||
                    errors.passwordincorrect
                  }
                  fluid
                  icon="lock"
                  iconPosition="left"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={e =>
                    this.updateInput(e, this.getPasswordErrorMessages)
                  }
                />

                <Button color="blue" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Don't have account? <a href="/registration">Click here</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
