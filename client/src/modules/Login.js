import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import InlineError from './InlineError';
import PropTypes from 'prop-types';




class Login extends Component {
state = {
  data: {
    email: '',
    password: ''
  },
  loading: false,
  errors: {}
}

onChange = event => this.setState({data: {...this.state.data, [event.target.name]: event.target.value}})

onSubmit = () => {
  const errors = this.validate(this.state.data);
  this.setState({errors});
  if (Object.keys(errors).length===0){
    this.props.submit(this.state.data);
  }
}

validate = data => {
    const errors = {};
    if(!data.email) errors.email= "E-mail can't be blank";
    if(!data.password) errors.password = "Password can't be blank";
    return errors;

}

 render() {

const {data, errors} = this.state;

   return (
     <div className='login-form'>

       <Grid textAlign='center' style={{ height: '100%' }, { marginTop: '5.5em' }} verticalAlign='middle'>
         <Grid.Column style={{ maxWidth: 450 }}>
           <Header as='h2' color='blue' textAlign='center'>
              Login to your account
           </Header>
           <Form size='large' onSubmit={this.onSubmit} >
             <Segment stacked>
               <Form.Input error={!!errors.email} fluid icon='mail' iconPosition='left' id='email' name='email' placeholder='E-mail address' value={data.email} onChange={this.onChange} />
               {errors.email && <InlineError text={errors.email}  /> }
               <Form.Input error={!!errors.password} fluid icon='lock' iconPosition='left' id='password' name='password' placeholder='Password' type='password' value={data.password} onChange={this.onChange} />
                {errors.password && <InlineError text={errors.password}  /> }
               <Button color='blue' fluid size='large'>
                 Login
               </Button>
             </Segment>
           </Form>
           <Message>
             Don't have account? <a href='/registration'>Click here</a>
           </Message>
         </Grid.Column>
       </Grid>
     </div>
   );
 }
}

Login.propTypes = {
  submit: PropTypes.func.isRequired
};

export default Login;
