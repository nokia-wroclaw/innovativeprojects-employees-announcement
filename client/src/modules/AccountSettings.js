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
import { changeName } from "../actions/authActions.js"


class NameSettings extends Component {
    constructor(props)
    {
        super()
        this.state={
          id: props.id,
          firstName : props.firstName,
          lastName : props.lastName
        }
    }

    onSubmit = e => {
      e.preventDefault();
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      };
      this.props.changeName(newUser);
    }

    updateInput = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      });
    };
    
    render() {
        return ( 
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment className = "changename-form" stacked textAlign="left">
                <Header as="h4" color="blue" textAlign="left" d> 
                    Change your first and last name
                </Header>

                <Form.Input id="firstName" name="firstName" 
                placeholder = "First Name" defaultValue= {this.props.firstName} 
                value={this.state.firstName}
                onChange={e =>
                  this.updateInput(e)
                }
                style={{ maxWidth: 250 }}
                />
  
                <Form.Input id="lastName" name="lastName"
                placeholder= "Last Name" defaultValue = {this.props.lastName} 
                value={this.state.lastName}
                onChange={e =>
                  this.updateInput(e)
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
    
         <Header as="h4" color="blue" textAlign="left" d> 
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
    
        <Header as="h4" color="blue" textAlign="left" d> 
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

NameSettings.propTypes = {
  changeName: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changeName }
)(withRouter(NameSettings));

export {NameSettings, PasswordSettings, ContactSettings}