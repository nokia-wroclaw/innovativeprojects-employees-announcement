import React, { Component } from "react";
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
import axios from "axios";

class NameSettings extends Component {
    constructor(props)
    {
        super()
        this.state={
          id: props.id,
          firstName: "",
          lastName: "",
          changeName: props.changeName,
          errors: {},
          firstNameErrorEmpty: "",
          firstNameErrorWhitespaces: "",
        }
    }

    componentDidMount()
    {
      var that = this
      axios
      .get('api/users/'+ this.state.id)
      .then(res => that.setState(
          {
              firstName: res.data.firstName,
              lastName: res.data.lastName
          }
      ))
      .catch(err => that.setState(
          {
              err
          }
      ));
    }

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
  
    onSubmit = e => {
      e.preventDefault();

      const errors = {
        ...this.getFirstNameErrorMessages(this.state.firstName),
        ...this.getLastNameErrorMessages(this.state.lastName)
      };
      
      const hasErrors = Object.values(errors).some(message => message !== "");

      if(!hasErrors)
      {
      const newUser = {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      };
      this.props.changeName(newUser)
      alert(newUser.id + " " + newUser.firstName + " " + newUser.lastName + "\n" + this.props.chang)
      }
      else {
        this.setState(errors);
      }
    }

    updateInput = (e, getErrorMessages) => {
      this.setState({
        ...getErrorMessages(e.target.value),
        [e.target.id]: e.target.value
      });
    };
    
    render() {
        return ( 
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment className = "changename-form" stacked textAlign="left">
                <Header as="h4" color="blue" textAlign="left"> 
                    Change your first and last name
                </Header>
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
                <Form.Input id="firstName" name="firstName"
                placeholder = "First Name" defaultValue= {this.state.firstName} 
                error={
                  this.state.firstNameErrorEmpty ||
                  this.state.firstNameErrorWhitespaces
                }
                value={this.state.firstName}
                onChange={e =>
                  this.updateInput(e, this.getFirstNameErrorMessages)
                }
                style={{ maxWidth: 250 }}
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
                <Form.Input id="lastName" name="lastName"
                placeholder= "Last Name" defaultValue = {this.state.lastName} 
                error={
                  this.state.lastNameErrorEmpty ||
                  this.state.lastNameErrorWhitespaces
                }
                value={this.state.lastName}
                onChange={e =>
                  this.updateInput(e, this.getLastNameErrorMessages)
                }
                style={{ maxWidth: 250 }}
                />

                <Button color="blue" fluid size="medium" style={{ maxWidth: 250 }}>
                  Apply
                </Button>
              </Segment>
            </Form>
             )  
    }

}

class PasswordSettings extends Component 
{
constructor(props)
{
    super()
    this.state={
      id: props.id,
      oldPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
      changePassword: props.changePassword,
      errors: {},
    }
}

updateInput = (e, getErrorMessages) => {
  this.setState({
    ...getErrorMessages(e.target.value),
    [e.target.id]: e.target.value
  });
};

getOldPasswordErrorMessages = oldPassword => {
  return "";
};

getNewPasswordErrorMessages = newPassword => {
  return {
    newPasswordErrorEmpty:
      newPassword.trim() === "" ? "New Password cannot be empty" 
      : "",
    newPasswordErrorWhitespaces: /\s/.test(newPassword)
      ? "New Password cannot contain whitespaces"
      : "",
    newPasswordErrorLength:
      newPassword.length < 6 ? "New Password must have at least 6 characters " 
      : "",
    newPasswordErrorOldPasswordSame:
      this.state.oldPassword == newPassword
      ? "New Password cannot be the same as the Old Password"
      : ""
  };
};

getNewPasswordConfirmationErrorMessages = newPasswordConfirmation => {
  return {
    newPasswordConfirmationErrorEmpty:
      newPasswordConfirmation.trim() === ""
        ? "New Password confirmation cannot be empty"
        : "",
    newPasswordConfirmationErrorWhitespaces: /\s/.test(newPasswordConfirmation)
      ? "New Password confirmation cannot contain whitespaces"
      : "",
    newPasswordConfirmationErrorMatch:
      this.state.newPassword !== newPasswordConfirmation
      ? "New Password and New Password Confirmation must match"
      : ""
  };
};

onSubmit = e => {
  const newUser = {
    id: this.state.id,
    oldPassword: this.state.oldPassword,
    newPassword: this.state.newPassword,
    newPasswordConfirmation: this.state.newPasswordConfirmation
  };
  this.props.changePassword(newUser)
  alert(newUser.id + " " + newUser.oldPassword + " " + newUser.newPassword +" " + newUser.newPasswordConfirmation + "\n" + this.props.changePassword)
}

render() {
    return ( 
      <Form size="large" noValidate onSubmit={this.onSubmit}>
      <Segment className = "changepassword-form" stacked textAlign="left">
    
         <Header as="h4" color="blue" textAlign="left"> 
            Change your password
         </Header>
       
        <Form.Input id="oldPassword" name="oldPassword"
                placeholder = "Old Password"
                // error={
                // }
                value={this.state.oldPassword}
                onChange={e =>
                  this.updateInput(e, this.getOldPasswordErrorMessages)
                }
                style={{ maxWidth: 250 }} 
        />
        <div>
          <span className="errorsColor">
              {this.state.newPasswordErrorEmpty}
          </span>
        </div>
        <div>
            <span className="errorsColor">
              {this.state.newPasswordErrorLength}
            </span>
        </div>
        <div>
            <span className="errorsColor">
              {this.state.newPasswordErrorWhitespaces}
            </span>
        </div>
        <div>
            <span className="errorsColor">
              {this.state.newPasswordErrorOldPasswordSame}
            </span>
        </div>
        <Form.Input  id="newPassword" name="newPassword"
                placeholder = "New Password"
                error={
                  this.state.newPasswordErrorEmpty ||
                  this.state.newPasswordErrorLength ||
                  this.state.newPasswordErrorWhitespaces ||
                  this.state.newPasswordErrorOldPasswordSame
                }
                value={this.state.newPassword}
                onChange={e =>
                  this.updateInput(e, this.getNewPasswordErrorMessages)
                }
                style={{ maxWidth: 250 }} 
        />

        <div>
          <span className="errorsColor">
              {this.state.newPasswordConfirmationErrorEmpty}
          </span>
        </div>
        <div>
            <span className="errorsColor">
              {this.state.newPasswordConfirmationErrorWhitespaces}
            </span>
        </div>
        <div>
            <span className="errorsColor">
              {this.state.newPasswordConfirmationErrorMatch}
            </span>
        </div>
        <Form.Input  id="newPasswordConfirmation" name="newPasswordConfirmation"
                placeholder = "Confirm New Password"
                error={
                  this.state.newPasswordConfirmationErrorEmpty ||
                  this.state.newPasswordConfirmationErrorWhitespaces ||
                  this.state.newPasswordConfirmationErrorMatch
                }
                value={this.state.newPasswordConfirmation}
                onChange={e =>
                  this.updateInput(e, this.getNewPasswordConfirmationErrorMessages)
                }
                style={{ maxWidth: 250 }} 
        />

        <Button color="blue" fluid size="medium" style={{ maxWidth: 250 }}>
          Apply
        </Button>
      </Segment>
    </Form>
    )
}
}

class ContactSettings extends Component
{
  constructor(props)
{
    super()
}
render() {
 
    return ( 
      <Form size="large" noValidate onSubmit={this.onSubmit}>
      <Segment className = "changecontact-form" stacked textAlign="left">
    
        <Header as="h4" color="blue" textAlign="left"> 
        Change your contact details
        </Header>

        <Form.Input placeholder="Contact number" style={{ maxWidth: 250 }}
        />
        
        <Button color="blue" fluid size="medium" style={{ maxWidth: 250 }}>
            Apply
        </Button>
     </Segment>
    </Form>
    )
}
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  id: state.id,
  firstName: state.firstName,
  lastName: state.lastName
});

export {NameSettings, PasswordSettings, ContactSettings}