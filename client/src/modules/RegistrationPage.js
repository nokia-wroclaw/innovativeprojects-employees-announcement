import React, { Component } from 'react';

import './RegistrationPage.css';
import {Grid, Button, Header, Form, Segment} from 'semantic-ui-react';

class RegistrationPage extends Component {
  constructor(){
      super();


      this.state = {
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        passwordConfirmation:''

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }


    handleChange(event) {
        let target = event.target;
        let value =  target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
      }

    handleSubmit(event) {
        event.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
      }

  render() {
    return (



        <div >
          <Grid textAlign='center' style={{ height: '100%' }, { marginTop: '5.5em' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
                Registration
              </Header>
              <Form size='large' onSubmit={this.handleSubmit} >
                <Segment stacked>
                  <Form.Input id="first_name" name="first_name" fluid icon='user' iconPosition='left' placeholder='First Name'  value={this.state.first_name} onChange={this.handleChange} />
                  <Form.Input id="last_name"  name="last_name" fluid icon='user' iconPosition='left' placeholder='Last Name'  value={this.state.last_name} onChange={this.handleChange} />
                  <Form.Input id="email"      name="email" fluid icon='mail' iconPosition='left' placeholder='E-mail address'  value={this.state.email} onChange={this.handleChange} />
                  <Form.Input id="password"   name="password" fluid icon='lock' iconPosition='left' placeholder='Password' type='password'  value={this.state.password} onChange={this.handleChange}/>
                  <Form.Input id="passwordConfirmation" name="passwordConfirmation" fluid icon='lock' iconPosition='left' placeholder='Password Confrimation' type='password'  value={this.state.passwordConfirmation} onChange={this.handleChange} />
                  <Button color='blue' fluid size='large'>
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

export default RegistrationPage;
