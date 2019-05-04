import React, { Component } from "react";
import {
  Grid,
  Button,
  Header,
  Form,
  Segment,
  Message
} from "semantic-ui-react";


class NameSettings extends Component {
    constructor(props)
    {
        super()
        this.state={
          firstNameInput : props.firstName,
          lastNameInput : props.lastName
        }
    }

    onSubmit = e => {
      e.preventDefault();

      this.props.changeName()
    }

    
    render() {
        return ( 
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment className = "changename-form" stacked textAlign="left">
                <Header as="h4" color="blue" textAlign="left" d> 
                    Change your first and last name
                </Header>

                <Form.Input placeholder = "First Name" defaultValue= {this.props.firstName} style={{ maxWidth: 250 }}
                />
  
                <Form.Input placeholder= "Last Name" defaultValue = {this.props.lastName} style={{ maxWidth: 250 }}
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


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export {NameSettings, PasswordSettings, ContactSettings}