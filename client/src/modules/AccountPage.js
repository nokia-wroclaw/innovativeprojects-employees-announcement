import React, { Component } from "react";
import "./AccountPage.css";
import "./RegistrationPage.css";
import {
  Grid,
  Button,
  Header,
  Form,
  Segment,
  Message
} from "semantic-ui-react";


class AccountPage extends Component {
    constructor()
    {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
            phone: "",
        }
    }

    render() {
        return ( 
            <div className = "changename-form" style={{ marginTop: "5em" }}>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 600 }} right aligned>
                    <Message>
                        <Header as="h3" color="blue" textAlign="center">
                            Account Details
                        </Header>
                    </Message>

                    <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked textAlign="left">
                <Header as="h4" color="blue" textAlign="left" d> 
                    Change your first and last name
                </Header>

                <Form.Input placeholder="First Name" style={{ maxWidth: 250 }}
                />

                <Form.Input placeholder="Last Name" style={{ maxWidth: 250 }}
                />

                <Button color="blue" fluid size="medium" style={{ maxWidth: 250 }}>
                  Apply
                </Button>
              </Segment>
            
              <Segment stacked textAlign="left">
            
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

              <Segment stacked textAlign="left">
            
                <Header as="h4" color="blue" textAlign="left" d> 
                Change your contact number
                </Header>

                <Form.Input placeholder="Contact number" style={{ maxWidth: 250 }}
                />
                
                <Button color="blue" fluid size="medium" style={{ maxWidth: 250 }}>
                    Apply
                </Button>
             </Segment>
            </Form>
                </Grid.Column>
            </Grid>
            
            </div>  )  
    }

}

export default AccountPage