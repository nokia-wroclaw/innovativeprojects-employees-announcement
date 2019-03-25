import React, { Component } from 'react';
import Login from './Login'

class LoginPage extends Component {

  submit = data => {
    console.log(data);
  }

  render() {
    return(

      <div>

      <Login submit={this.submit} />
      </div>

    );
  }
}



export default LoginPage;
