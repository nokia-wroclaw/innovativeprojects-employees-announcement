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
import { changeName } from "../actions/authActions.js";


class NameSettings extends Component {
    constructor(props)
    {
        super()
        this.state={
          id: props.id,
          firstName: props.firstName,
          lastName: props.lastName,
          changeName: props.changeName,
          errors: {},
          firstNameErrorEmpty: "",
          firstNameErrorWhitespaces: "",
        }
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
      alert(newUser.id + " " + newUser.firstName + " " + newUser.lastName + "\n" + this.props.changeName)
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
}

render() {
    return ( 
      <Form size="large" noValidate onSubmit={this.onSubmit}>
      <Segment className = "changepassword-form" stacked textAlign="left">
    
         <Header as="h4" color="blue" textAlign="left"> 
            Change your password
         </Header>

        <Form.Input placeholder="Old password" style={{ maxWidth: 250 }}
        />

        <Form.Input placeholder="New password" style={{ maxWidth: 250 }}
        />

        <Form.Input placeholder="Confirm new password" style={{ maxWidth: 250 }}
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

export default connect(
  mapStateToProps,
  { changeName }
)(withRouter(NameSettings));

export {NameSettings, PasswordSettings, ContactSettings}